import React from 'react';
import './index.css';

/**
 Component to display tree node data and and fire events.
 */
export class Node extends React.Component {

    /**
     * Renders node component and its child nodes components.
     */
    render() {

        var childNodes = []
        if (this.props.childNodes !== null
            && typeof this.props.childNodes !== 'undefined'
            && this.props.childNodes.length > 0) {
            for (var i = 0; i < this.props.childNodes.length; i++) {
                childNodes.push(this.renderChildNode(i));
            }
        }

        return (
            <div>
                <button className="node"
                    onClick={() => this.props.onSelect(this.props.id, this.props.name)}>
                {this.props.name}
                </button>
                <div className="child">
                    {childNodes}
                </div>
        </div>
        );
    }

    /**
     * Renders node components for parent's child node.
     * @param {number} i Index of child node.
     */
    renderChildNode(i) {

        return (
            <Node
                key={this.props.childNodes[i].id}
                id={this.props.childNodes[i].id}
                name={this.props.childNodes[i].name}
                childNodes={this.props?.childNodes[i].childNodes}
                onSelect={(id, name) => this.handleSelect(id, name)}

            />
        );
    }

    /**
     * Handles node component's select event.
     * @param {string} id Selected component id.
     * @param {string} name Selected component name.
     */
    handleSelect(id, name) {
        this.props.onSelect(id, name);
    }
}