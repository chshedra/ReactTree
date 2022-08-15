import React from 'react';
import './index.css';

/**
 * Component of panel to control tree operations.
 */
export class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Renders control panel.
     */
    render() {
        return (
            <div>
                <button className="button-control"
                    onClick={() => { this.props.onAddNode() }}>
                    Add
                </button>
                <button className="button-control"
                    onClick={() => { this.props.onRemoveNode() }}>
                    Remove
                </button>
                <button className="button-control"
                    onClick={() => { this.props.onClearTree() }}>
                    Reset
                </button>
                <label>Selected Node:</label>
                <input value={this.props.selectedNodeName}
                    onChange={this.handleChange}></input>
            </div>);
    }

    /**
     * Handles input value change event.
     * @param {any} e Event arguments.
     */
    handleChange(e) {
        this.props.onEditNode(e.target.value);
    }
}