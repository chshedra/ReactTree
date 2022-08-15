import React from 'react';
import ReactDOM from 'react-dom/client';
import { Tree } from './Tree.js'
import { TreeData } from './TreeData.js'
import { NodeData } from './NodeData.js'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const treeData = new TreeData(new NodeData('0', '', []));
root.render(<Tree treeData={treeData} />);

