import React from 'react';
import { Node } from './Node.js'
import { ControlPanel } from './ControlPanel.js'
import './index.css';

/**
 * Main component to render nodes and handle their events.
 */
export class Tree extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            treeData: props.treeData,
            selectedNodeId: 0,
            selectedNodeName: '',
        }
    }

    /**
     * Renders components tree and control panel.
     */
    render() {
        return (
            <div>
                <this.Root/>
                <ControlPanel
                    selectedNodeName={this.state.selectedNodeName}
                    onAddNode={() => this.handleAddNode()}
                    onRemoveNode={() => this.handleRemoveNode()}
                    onEditNode={(name) => this.handleNodeEdit(name)}
                    onClearTree={() => this.handleClearTree()}/>
            </div>);
    }

    /**
     * Gets element of tree root.
     */
    Root = () => {

        return (this.createRoot());
    };

    /**
     * Creates tree root by node component. 
     */
    createRoot() {
        if (!this.state.treeData.root) {
            return;
        }

        return (<Node
            id={this.state.treeData.root.id}
            name={this.state.treeData.root.name }
            childNodes={this.state.treeData.root.childNodes}
            onSelect={(id, name) => this.handleSelect(id, name)}
        />);
    }

    /**
     * Handles child node selection event.
     * @param {string} id Selected node id.
     * @param {string} name Selected node name.
     */
    handleSelect(id, name) {
        this.setState({ selectedNodeId: id, selectedNodeName : name });
    }

    /**
     * Handles node add event. 
     */
    handleAddNode() {
        var treeData = this.state.treeData;
        treeData.addNode(this.state.selectedNodeId);

        this.setState({ treeData: treeData });
    }

    /**
     * Handles node remove event.
     */
    handleRemoveNode() {
        var treeData = this.state.treeData;
        treeData.removeNode(this.state.selectedNodeId);

        this.setState({ treeData: treeData, selectedNodeId: 0, selectedNodeName: '' });
    }

    /**
     * Handles clear tree event.
     */
    handleClearTree() {
        var treeData = this.state.treeData;
        treeData.clearTree();

        this.setState({ treeData: treeData });
    }

    /**
     * Handles node edit event.
     * @param {any} name
     */
    handleNodeEdit(name) {
        var treeData = this.state.treeData;
        treeData.editNode(this.state.selectedNodeId, name);

        this.setState({ treeData: treeData, selectedNodeName: name });

    }
}