import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status} // Pass the status down to the card
        />
      );
    });
    
    return (
      <div className="Swimlane-column" data-status={this.props.name.toLowerCase()}>
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
          {cards}
        </div>
      </div>
    );
  }  
}
