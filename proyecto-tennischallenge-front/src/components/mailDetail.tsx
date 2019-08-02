import React from 'react';
import { IMsg } from '../interfaceIMsg';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IPropsGlobal {
    msgs: IMsg[];
}

const MailDetail: React.FC<IPropsGlobal & RouteComponentProps<{ id_message: string }>> = props => {

//deberia de recoger de la store el message
    
const id_msg = props.match.params.id_message;
const message = props.msgs.filter(m => m.id_messages === +id_msg);
console.log(props.msgs);
if(message.length < 1 || message.length >1){
    console.log("El mensaje " + id_msg + " no existe");
    return null
}
    return (
        <div>
   
        <div className="row">
            De: {message[0].id_player_sent}
        </div>
        <div className="row">
            Asunto: {message[0].subject}
        </div>
        <div className="row">
            Fecha: {message[0].date}
        </div>
        <div className="row">
            text: {message[0].text}
        </div>
           {/* <div className="row"> */}
               {/* responder con boton a add Message */}
           {/* </div> */} 
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    // token: state.token,
    msgs: state.msgs

});

// const mapDispachToProps = {
//     setMessages: actions.setMessages
// }

export default connect(
    mapStateToProps
)(MailDetail);

