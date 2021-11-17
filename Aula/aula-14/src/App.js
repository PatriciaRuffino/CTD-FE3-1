import { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import api from './services/api';
import './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cepNumber: []
    }
  }

  

  handleSubmit = async ({ cepNumber }) => {
    console.log()
    if (cepNumber !== '') {
      try {
        const response = await api.get(`/${cepNumber}/json`);
        this.setState({ cepNumber: response.data });
        console.log(response.data)
      } catch (error) {
        Swal.fire({
          title: error.response.status,
          icon: 'error',
          text: error.response.data.message
        });
      }
    }
  }

  render() {
    return (
      <>
        <main>
          <div className="col-md-4 col-sm-6 my-3 container text-center">
            <h2>Procure um CEP</h2>
            <Formik initialValues={{ cepNumber: '' }} onSubmit={this.handleSubmit}>
              <Form>
                <Field placeholder="Insira o cep" required type="text" name="cepNumber" id="cepNumber" className="form-control" />
                <button type="submit" className="btn btn-primary my-4">Pesquisar</button>
              </Form>
            </Formik>
          </div>
         <ul>
           <li>bairro: {this.state.cepNumber.bairro}</li>
           <li>cep: {this.state.cepNumber.cep}</li>
           <li>ddd: {this.state.cepNumber.ddd}</li>
           <li>logradouro: {this.state.cepNumber.logradouro}</li>
           <li>uf: {this.state.cepNumber.uf}</li>
           <li>localidade: {this.state.cepNumber.localidade}</li>
           </ul>
           

        </main>
          
      </>
    );
  }
}
         
           
           
