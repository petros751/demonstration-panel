import React from 'react';
import { Tab } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import '../style/main.css'
// import UsersTable from './users/UsersTableComponent';

export default function MainComponent() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchOnlyVodaUsers());
//   }, [dispatch]);

  const mainPanes = [
    { menuItem: 'Users', render: () => <Tab.Pane></Tab.Pane> },
  ];
  return (
    <div className="container">
      <div className="panelTables">
        <Tab defaultActiveIndex={3} panes={mainPanes} />
      </div>
      <ToastContainer />
    </div>
  );
}
