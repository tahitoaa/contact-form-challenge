import './App.css';
import {useState} from 'react';

/* @TODO Split into one file per component. */

function Label (props) {
  return (<label> {props.i+1}. {props.l} : </label>)
}

function FormField (props) {
  console.log(props.field);

  function label() {
    return (<Label i={props.i} l={props.field.label}/>);
  }

  function field() {
    switch (props.field.type){
      case "string":
        return (
            <input/>
        )
      case "select":
        return (
            <select>
              {
                props.field.options && props.field.options.map(
                  (opt, i) => {
                    return (<option value={i} key={i}> {opt}</option>)
                  }
                )
              }
            </select>
        )
      case "text":
        return (
            <textarea>
            </textarea>
      )
      case "attachment":
        return (
          <input id="image-file" type="file" />
        )
      default:
        return (<div> {props.i}. Champs non géré pour le moment.  </div>);
    }
  }

  return (<div>
    {label()}
    {field()}
  </div>)
}

function SubmitForm (props) {
  return (
    <button>Envoyer la demande</button>
  )
}

function Form (props) {
  return (
    <div>
      <h1> 
       {props.form.title} 
      </h1>
      {/* <h4>
        Formulaire {props.form.id} 
      </h4> */}
      <div>
        <form>
        { props.form.fields && props.form.fields.map( (field, i) => {return <FormField field={field} i={i}/>})  }
        <SubmitForm/>
        </form>
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
          props.forms && 
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
