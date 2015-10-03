/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react/addons';
const PureRenderMixin = React.addons.PureRenderMixin;

import DragLayer from 'react-dnd/modules/DragLayer';

function collect (monitor) {
    var item = monitor.getItem();
    return {
        name: item && item.name,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

export const ItemPreview = React.createClass({
    displayName: 'ItemPreview',
    mixins: [PureRenderMixin],
    propTypes: {
        name: React.PropTypes.string,
        currentOffset: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        }),
        isDragging: React.PropTypes.bool
    },
    render: function () {
        if (!this.props.isDragging) {
            return <li></li>;
        }

        return (
            <li
                className="item preview"
                style={getItemStyles(this.props.currentOffset)}
            >
                {this.props.name}
            </li>
        );
    }
});

export default DragLayer(collect)(ItemPreview);