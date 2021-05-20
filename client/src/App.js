import './App.css';
import {useState} from 'react';

/* @TODO Split into one file per component. */

function Label (props) {
  return (<label> {props.i+1}. {props.l} : </label>)
}

function FormField (props) {
  function label() {
    return (<Label i={props.i} l={props.field.label} for={"field-"+props.i}/>);
  }

  function field() {
    switch (props.field.type){
      case "string":
        return (
            <input id={"field-"+props.i} name={props.field.name}/>
        )
      case "select":
        return (
            <select id={"field-"+props.i} name={props.field.name}>
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
            <textarea id={"field-"+props.i} name={props.field.name}>
            </textarea>
      )
      case "attachment":
        return (
          <input id={"field-"+props.i} type="file" name={props.field.name}/>
        )
      default:
        return (<div> {props.i}. Champs non géré pour le moment.  </div>);
    }
  }

  return (<fieldset>
    {label()}
    {field()}
    <br></br>
  </fieldset>)
}

function SubmitForm (props) {
  return (
    <input type="submit" value="Envoyer le formulaire"/>
  )
}

function Form (props) {
  const contains_upload = props.form && 
                          props.form.fields && 
                          (props.form.fields.find(f => {return f.type === "attachment";}) != null);
  const content_type = contains_upload ? "multipart/form-data" : "application/json";
  const action = props.server + (contains_upload ? "sendform_upload" : "sendform");

  return (
    <div>
      <h1> 
       {props.form.title} 
      </h1>
      {/* <h4>
        Formulaire {props.form.id} 
      </h4> */}
      <div className="form">
        <form action={action} method="post" encType={content_type} target="res-frame">
          { props.form.fields && props.form.fields.map( (field, i) => {return <FormField field={field} i={i}/>})  }
        <SubmitForm/>
        </form>
      </div>
      <iframe name="res-frame"/>
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
      <Form form={props.forms[selection]} server={props.server}/>
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
      <PickForm forms={getForms()} server={server_url} />
    </div>
  );
}

export default App;
