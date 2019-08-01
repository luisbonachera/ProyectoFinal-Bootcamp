import React from 'react';
import { Link } from 'react-router-dom';

const MenuMail = () => {

    return (
        <div>

            <div className="row">
                Nuevo
            </div>
            <div className="row">
                <Link to="/mailTray/sent"> Enviados </Link>
            </div>
            <div className="row">
                <Link to="/mailTray/recive"> Recibidos </Link>

            </div>

        </div>
    )
}

export default MenuMail;