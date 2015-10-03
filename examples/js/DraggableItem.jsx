/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react/addons';
import DragSource from 'react-dnd/modules/DragSource';
import DropTarget from 'react-dnd/modules/DropTarget';

import classnames from 'classnames';

class Item extends React.Component {
    propTypes: {
        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,

        // react-dnd props
        connectDragSource: React.PropTypes.func,
        connectDropTarget: React.PropTypes.func,
        connectDragPreview: React.PropTypes.func,
        onReorder: React.PropTypes.func,
        isDragging: React.PropTypes.bool,
        isOver: React.PropTypes.bool
    }

    render () {
        const className = classnames('item', {
            'is-over': this.props.isOver
        });

        let content = (
            <li className={className}>
                {this.props.id} {this.props.name}
            </li>
        );

        // Connect as drag source
        content = this.props.connectDragSource(content, { dropEffect: 'move' });
        // Connect as drop target
        content = this.props.connectDropTarget(content);
        // Connect to drag layer
        content = this.props.connectDragPreview(content);

        return content;
    }
}

/**
 * The docs for the following functions can be found in
 * react-dnd's docs: http://gaearon.github.io/react-dnd/docs-overview.html
 */
const dragSource = {
    beginDrag: function (props) {
        return {
            id: props.id,
            name: props.name,
            onReorder: props.onReorder
        };
    }
};

function dragCollect (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

const dropTarget = {
    drop: function (props, monitor) {
        const item = monitor.getItem();
        item.onReorder(item.id, props.id);
    }
};

function dropCollect (connect, monitor) {
    var difference = monitor.getDifferenceFromInitialOffset() || {};
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const DropComponent = DropTarget('Item', dropTarget, dropCollect);
const DragComponent = DragSource('Item', dragSource, dragCollect);

export default DragComponent(DropComponent(Item));