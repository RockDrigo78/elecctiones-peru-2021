import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://nmpeupr.azurewebsites.net/shato")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      
      const votosKeiko = parseInt(items.results[1].TOTAL_VOTOS.replace(/[,]+/g, ''))

      const votosPedro = parseInt(items.results[0].TOTAL_VOTOS.replace(/[,]+/g, ''))

      const difVotos = Math.abs(votosKeiko - votosPedro).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      const ganando = votosKeiko > votosPedro ? 'Keiko' : 'Castillo'

      return (
        <div className='App'>
          <div className='titulo'>
            <div>ELECCIONES PERU 2021</div>
            <div>SEGUNDA VUELTA</div>
          </div>
          <div className='subtitulo'>RESULTADOS Y DIFERENCIA DE VOTOS</div>

          <div className='agrupaciones'>
            <div className='agrupacion'>
                <div className='title'>{items.results[0].AGRUPACION}</div>                
                <div>{items.results[0].TOTAL_VOTOS}</div> 
            </div>   

            <div className='agrupacion'>
                <div className='title'>{items.results[1].AGRUPACION}</div>                
                <div>{items.results[1].TOTAL_VOTOS}</div> 
            </div>  
          </div>
       
          <div className='gana'>
              <div>Va ganando</div>                
              <div>{ganando}</div> 
          </div>  

          <div className='diferencia'>
              <div>Diferencia de Votos</div>                
              <div>{difVotos}</div> 
          </div>  
          
          <div className='info'>
            <div>Porcentaje analizado: {items.generals.actData.POR_AVANCE}%</div>
            <div>Fecha de la data: {items.generals.actData.FECHA}</div>
            <div>Hora de la data: {items.generals.actData.HORA}</div>
          </div>
      </div>
      );
    }
  }
}
  export default App;
  