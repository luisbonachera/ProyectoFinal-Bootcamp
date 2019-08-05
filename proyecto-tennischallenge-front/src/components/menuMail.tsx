import React from 'react';
import { Link } from 'react-router-dom';

const MenuMail = () => {

    return (
        <div>

            <div className="row">
                <Link to="/mailTray/add"> Nuevo </Link>
            </div>
            <div className="row">
                <Link to="/mailTray/received"> Recibidos </Link>
            </div>
            <div className="row">
                <Link to="/mailTray/sent"> Enviados </Link>
            </div>

        </div>
    )
}

export default MenuMail;