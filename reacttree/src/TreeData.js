import { NodeData } from "./NodeData.js"

/**
 * Stores and processes data for tree rendring.
 */
export class TreeData {
    /**
     * @param {NodeData} root The main parent node of tree 
     * used to store and process child nodes. 
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Adds new node to child nodes of selected node. 
     * @param {string} parentId Node id to add new node.
     */
    addNode(parentId) {
        if (!this.root) {
            this.root = new NodeData('0', '', []);
        }

        var node = this.findNodeById(parentId, this.root);

        var lastIdValue = this.getNodesLastIdValue(node);
        var firstIdValue = Number(parentId) === 0
            ? ''
            : `${node.id}.`;
        var newNodeId = `${firstIdValue}${Number(lastIdValue) + 1}`;
        node.childNodes.push(new NodeData(newNodeId, 'Node ' + newNodeId, []));
    }

    /**
     * Edits name of selected node.
     * @param {string} nodeId Selected node id.
     * @param {string} newName New name for selected node.
     */
    editNode(nodeId, newName) {

        var parentNodeId = nodeId.substring(0, nodeId.length - 2);
        var node = this.findNodeById(parentNodeId, this.root);

        for (var i = 0; i < node.childNodes.length; i++) {
            if (nodeId === node.childNodes[i].id) {
                node.childNodes[i]
                    = new NodeData(nodeId, newName, node.childNodes[i].childNodes)
            }
        }
       
    }

    /**
     * Removes selected node from tree.
     * @param {string} nodeId Selected node id.
     */
    removeNode(nodeId) {
        var parentNodeId = nodeId.substring(0, nodeId.length - 2);
        var node = this.findNodeById(parentNodeId, this.root);

        for (var i = 0; i < node.childNodes.length; i++) {
            if (nodeId === node.childNodes[i].id) {
                node.childNodes.splice(i, 1);
            }
        }
    }

    /**
     * Removes all child nodes of tree. 
     */
    clearTree() {
        this.root.childNodes = [];
    }

    /**
     * Recursively finds node by id.
     * @param {string} id Id of node to find.
     * @param {NodeData} parent Parent node to find node by id.
     */
    findNodeById(id, parent) {
        if (id.toString() === parent.id.toString() || id === '') {
            return parent;
        }
        for (var i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i].id === id) {
                return parent.childNodes[i];
            } else if (parent.childNodes[i].childNodes.length > 0) {
                var nested = this.findNodeById(id, parent.childNodes[i]);
                if (nested) {
                    return nested;
                }
            }
        }
    }

    /**
     * Gets last number of last child node's id.
     * @param {any} node Parent node to find it's last child node's last id.
     */
    getNodesLastIdValue(node) {
        var lastIdValue;
        if (node.childNodes.length > 0) {
            var lastId = node.childNodes[node.childNodes.length - 1].id.split('.');
            lastIdValue = lastId[lastId.length - 1];
        }
        else {
            lastIdValue = 0;
        }

        return (lastIdValue);
    }
}