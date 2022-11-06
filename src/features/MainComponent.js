import React from 'react';
import { Tab } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import '../style/main.css'
import UsersTable from './users/UsersComponent';
import Products from './products/ProductsComponent';
import Carts from './carts/CartsComponent';

export default function MainComponent() {

  const mainPanes = [
    { menuItem: 'Employees', render: () => <Tab.Pane><UsersTable /></Tab.Pane> },
    { menuItem: 'Products', render: () => <Tab.Pane><Products /></Tab.Pane> },
    { menuItem: 'Carts', render: () => <Tab.Pane><Carts /></Tab.Pane> },
  ];
  return (
    <div className="container">
      <div className="panelTables">
        <Tab defaultActiveIndex={0} panes={mainPanes} />
      </div>
      <ToastContainer />
    </div>
  );
}
