
import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super
(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef()
    };
  }

    // Define getClients()
    getClients() {
      return [
        { id: 1, name: 'Stark, White and Abbott', description: 'Cloned Optimal Architecture', status: 'backlog' },
        { id: 2, name: 'Wiza LLC', description: 'Exclusive Bandwidth-Monitored Implementation', status: 'backlog' },
        { id: 3, name: 'Nolan LLC', description: 'Vision-Oriented 4Thgeneration Graphicaluserinterface', status: 'backlog' },
        { id: 4, name: 'Thompson PLC', description: 'Streamlined Regional Knowledgeuser', status: 'backlog' },
        { id: 5, name: 'Walker-Williamson', description: 'Team-Oriented 6Thgeneration Matrix', status: 'backlog' },
        { id: 6, name: 'Boehm and Sons', description: 'Automated Systematic Paradigm', status: 'backlog' },
        { id: 7, name: 'Runolfsson, Hegmann and Block', description: 'Integrated Transitional Strategy', status: 'backlog' },
        { id: 8, name: 'Schumm-Labadie', description: 'Operative Heuristic Challenge', status: 'backlog' },
        { id: 9, name: 'Kohler Group', description: 'Re-Contextualized Multi-Tasking Attitude', status: 'backlog' },
        { id: 10, name: 'Romaguera Inc', description: 'Managed Foreground Toolset', status: 'backlog' },
        { id: 11, name: 'Reilly-King', description: 'Future-Proofed Interactive Toolset', status: 'backlog' },
        { id: 12, name: 'Emard, Champlin and Runolfsdottir', description: 'Devolved Needs-Based Capability', status: 'backlog' },
        { id: 13, name: 'Fritsch, Cronin and Wolff', description: 'Open-Source 3Rdgeneration Website', status: 'backlog' },
        { id: 14, name: 'Borer LLC', description: 'Profit-Focused Incremental Orchestration', status: 'backlog' },
        { id: 15, name: 'Emmerich-Ankunding', description: 'User-Centric Stable Extranet', status: 'backlog' },
        { id: 16, name: 'Willms-Abbott', description: 'Progressive Bandwidth-Monitored Access', status: 'backlog' },
        { id: 17, name: 'Brekke PLC', description: 'Intuitive User-Facing Customerloyalty', status: 'backlog' },
        { id: 18, name: 'Bins, Toy and Klocko', description: 'Integrated Assymetric Software', status: 'backlog' },
        { id: 19, name: 'Hodkiewicz-Hayes', description: 'Programmable Systematic Securedline', status: 'backlog' },
        { id: 20, name: 'Murphy, Lang and Ferry', description: 'Organized Explicit Access', status: 'backlog' },
    ];
    }

  

  componentDidMount() {
    this.dragula = Dragula([
      this.swimlanes.backlog.current, 
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ]);

    this.dragula.on('drop', (el, target, source, sibling) => {
      const cardId = el.getAttribute('data-id');
      const targetLane = target.parentElement.getAttribute('data-lane'); 

      this.handleCardDrop(cardId, targetLane);
    });
  }

  componentWillUnmount() {
    this.dragula.destroy(); 
  }

  handleCardDrop(cardId, targetLane) {
    let newState = { ...this.state };
    let card = null;
    for (let lane in newState.clients) {
      card = newState.clients[lane].find(client => client.id === Number(cardId));
      if (card) {
        newState.clients[lane] = newState.clients[lane].filter(client => client.id
 !== Number(cardId));
        break;
      }
    }
    if (card) {
      card.status = targetLane.toLowerCase(); 
      newState.clients[targetLane.toLowerCase()] = [...newState.clients[targetLane.toLowerCase()], card];
      this.setState(newState);
    }
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane
        name={name}
        clients={clients}
        dragulaRef={ref}
        data-lane={name}
      />
    );
  }

  // ... (rest of your Board.js code, including getClients and render methods) ...

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('in-progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}