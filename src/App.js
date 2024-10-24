import React from 'react';
import Login from './Login';
import { AppRoute } from './AppRoute'
import StatiquePage from './StatiquePage';
import Menu from './Menu'
import Villes from './Villes'
import MenuParametrage from './MenuParametrage'
import GestionAdmin from './GestionAdmin'
import AjoutAdmin from './AjoutAdmin'
import ModifAdmin from './ModifAdmin'
import AjoutVille from './AjoutVille'
import ModifVille from './ModifVille'
import Commerciaux from './Commerciaux'
import AjoutCommercial from './AjoutCommercial'
import ModifCommercial from './ModifCommercial'
import Articles from './Articles';
import ModifArticle from './ModifArticle';
import AjoutArticle from './AjoutArticle';
import ExplArticle from './ExplArticle'
import Devis from './Devis';
import Clients from './Clients'
import Commande from './Commande';
import AjoutClient from './AjoutClient'
import ModifClient from './ModifClient'
import ExplClient from './ExplClient'
import Maps from './Maps'
import RapportVisite from './RapportVisite'
import ExplRappVisite from './ExplRappVisite'
import AjoutSoldeinitiale from './AjoutSoldeinitiale'
import ModifSoldeinitiale from './ModifSoldeinitiale'
import Soldeinitiale from './Soldeinitiale'
import Facture from './Facture'

import { Link, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import SolderClient from './SolderClient';
import ImprimeDevis from './ImprimeDevis';
import ImprimeCommande from './ImprimeCommande';
import ConsulterReglement from './ConsulterReglement';
import ImprimeExtrait from './ImprimeExtrait';
import ImprimeFacture from './ImprimeFacture';




function App() {
  return (
    <Router>
      <Switch>
        <AppRoute path="/ModifCommercial" component={ModifCommercial} layout={StatiquePage}></AppRoute>
        <AppRoute path="/AjoutCommercial" component={AjoutCommercial} layout={StatiquePage}></AppRoute>
        <AppRoute path="/MenuParametrage" component={MenuParametrage} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ExplRappVisite" component={ExplRappVisite} layout={StatiquePage}></AppRoute>
        <AppRoute path="/RapportVisite" component={RapportVisite} layout={StatiquePage}></AppRoute>
        <AppRoute path="/GestionAdmin" component={GestionAdmin} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ModifClient" component={ModifClient} layout={StatiquePage}></AppRoute>
        <AppRoute path="/AjoutClient" component={AjoutClient} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Commerciaux" component={Commerciaux} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ExplClient" component={ExplClient} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ModifVille" component={ModifVille} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ModifArticle" component={ModifArticle} layout={StatiquePage}></AppRoute>
        <AppRoute path="/AjoutVille" component={AjoutVille} layout={StatiquePage}></AppRoute>
        <AppRoute path="/AjoutArticle" component={AjoutArticle} layout={StatiquePage}></AppRoute>
        
        <AppRoute path="/ExplArticle" component={ExplArticle} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ModifAdmin" component={ModifAdmin} layout={StatiquePage}></AppRoute>
        <AppRoute path="/AjoutAdmin" component={AjoutAdmin} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Clients" component={Clients} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Villes" component={Villes} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Articles" component={Articles} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Devis" component={Devis} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Facture" component={Facture} layout={StatiquePage}></AppRoute>
         <AppRoute path="/AjoutSoldeinitiale" component={AjoutSoldeinitiale} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ModifSoldeinitiale" component={ModifSoldeinitiale} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Soldeinitiale" component={Soldeinitiale} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ImprimeDevis" component={ImprimeDevis} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ImprimeCommande" component={ImprimeCommande} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ImprimeExtrait" component={ImprimeExtrait} layout={StatiquePage}></AppRoute>
        <AppRoute path="/ImprimeFacture" component={ImprimeFacture} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Commande" component={Commande} layout={StatiquePage}></AppRoute>
        <AppRoute path="/SolderClient" component={SolderClient} layout={StatiquePage}></AppRoute>
        <AppRoute path="/consulteReglementclient" component={ConsulterReglement } layout={StatiquePage}></AppRoute>
        <AppRoute path="/Menu" component={Menu} layout={StatiquePage}></AppRoute>
        <AppRoute path="/Maps" component={Maps} layout={StatiquePage}></AppRoute>
        <Route path="/" render={() => <Login />} />
      </Switch>
    </Router>
  );
}

export default App;