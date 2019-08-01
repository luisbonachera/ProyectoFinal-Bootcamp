import React from 'react';
import { Switch, Route } from 'react-router';
import MenuMail from './menuMail';
import ListMail from './listMail';
import MailDetail from './mailDetail';


const MailTray = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <Switch>
                    <div className="col-2">
                        {/* <MenuMail /> */}
                        <Route path="/mailTray" exact component={MenuMail} />
                    </div>
                    <div className="col-8">

                        <Route path="/mailTray/:typeMessage" exact component={ListMail} />
                        <Route path="/mailTray/:typeMessage/:id" exact component={MailDetail} />
                    </div>
                </Switch>

            </div>
        </div>
    )
}

export default MailTray;