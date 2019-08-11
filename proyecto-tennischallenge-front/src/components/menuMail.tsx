import React from 'react';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IPropsGloblal {
    token: string;
    // players: IPlayer[];
    player: IPlayer;
    // setMessages: (msgs: IMsg[]) => void;
    // setPlayer: (player: IPlayer) => void;
}

const MenuMail: React.FC<IPropsGloblal> = props => {

    let decode : any;
    if(props.token){
        decode = jwt.decode(props.token);
    }
    

    return (
        <div>
            {decode && decode.id_player && (
            <div className="row">
                <Link className="text" to={"/mailTray/add/"+ decode.id_player }> Nuevo </Link>
            </div>
            )}
            <div className="row">
                <Link className="text" to="/mailTray/received"> Recibidos </Link>
            </div>
            <div className="row">
                <Link className="text" to="/mailTray/sent"> Enviados </Link>
            </div>

        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    player: state.player

});

// const mapDispachToProps = {
//     setMessages: actions.setMessages
// }

export default connect(
    mapStateToProps
)(MenuMail);