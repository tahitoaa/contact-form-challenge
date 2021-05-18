import './App.css';
import {useEffect, useState} from 'react';

function FormField (props) {
  switch (props.type){
    case "string":

      break;
    default:
      break;
  }

  return (<div> field </div>)
}

function Form (props) {
  return (
    <div>
      <h1> 
      Formulaire {props.form.id} : {props.form.title} 
      </h1>
      <div>
      { props.form.fields.map( (field, i) => {return <FormField props={field}/>})  }
      </div>
    </div>
  )
}

function PickForm (props) {
  const [selection, setSelection] = useState(0);
  console.log("forms in picker " + props.forms);
  
  const onSelectionChanged = function (event) {
    setSelection(event.target.value);
  }

  return (
    <div>
      <label for="select">
      Veuillez choisir une question: 
      </label>
      <select id="select" name="question" onChange={onSelectionChanged}>
        {
          props.forms.map(
            (f, i) => {
              return (
                  <option key={f.id} value={i}>
                    Formulaire n° {f.id} -  {f.title}
                  </option>)
            })
        }
      </select>
      <Form form={props.forms[selection]}/>
    </div>
  )
}

function App() {
  // forms contains the data structure of each form
  // it must be get from server.
  const [forms, setForms] = useState([]);
  const server_url = "http://127.0.0.1:3001/";

  function getForms () {
    var xmlHttp = new XMLHttpRequest();
    const target_url = server_url + "forms";
    xmlHttp.open( "GET", target_url, false); // false for synchronous request
    xmlHttp.send( null);
    if (xmlHttp.status == 200) {
      const r = JSON.parse(xmlHttp.responseText);
      console.log("forms from server : " + r);  
      return r;
    } else {
      console.err("failed to fetch forms from server.");
      return [];
    }
  } 
  return (
    <div className="App">
      <h1> Formulaire de contact </h1>
      <PickForm forms={getForms()} />
    </div>
  );
}

export default App;
