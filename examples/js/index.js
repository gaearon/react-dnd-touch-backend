/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react/addons';
import DraggableItem from './DraggableItem.jsx';
import { default as ItemPreview } from './ItemPreview.jsx';
import { default as Touch } from '../../src/Touch';
import DragDropContext from 'react-dnd/modules/DragDropContext';
import { List } from 'immutable';

let initialData = [];
let i = 0;
for (; i < 10; i++) {
    initialData.push(i);
}
initialData = new List(initialData);

function reorder (data, dragId, dropId) {
    console.log(`Dragged ${dragId} to ${dropId}`);

    var order = data.toArray();
    var dragIndex;
    var dropIndex;
    // If drag & drop target is the same of we don't have either on the list,
    // bounce
    if (
        dragId === dropId ||
        (dragIndex = order.indexOf(dragId)) < 0 ||
        (dropIndex = order.indexOf(dropId)) < 0
    ) {
        return;
    }

    // Remove dragId from array
    order.splice(dragIndex, 1);

    // Insert dragId in new location
    order.splice(dropIndex, 0, dragId);
    render(new List(order));
}

class Items extends React.Component {
    propTypes: {
        data: React.PropTypes.array.isRequired
    }

    onReorder (...args) {
        reorder(this.props.data, ...args);
    }

    render () {
        const items = this.props.data.toArray().map(i => (
            <DraggableItem
                key={i}
                id={i}
                name="Item"
                onReorder={this.onReorder.bind(this)}
            />
        ));

        return (
            <ul className="list">
                {items}
                <ItemPreview key="__preview" name="Item" />
            </ul>
        );
    }
}

const SortableList = DragDropContext(Touch)(Items);

function render (data = initialData) {
    React.render(<SortableList data={data}/>, document.getElementById('main'));
}

render();