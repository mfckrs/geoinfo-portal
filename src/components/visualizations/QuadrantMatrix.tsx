import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';

interface QuadrantData {
    id: string;
    name: string;
    x: number; // Technical Difficulty (0-100)
    y: number; // Career Relevance (0-100, higher is better)
    radius: number;
    color: string;
    category: string;
}

interface QuadrantMatrixProps {
    data: QuadrantData[];
    width?: number;
    height?: number;
    onClick?: (id: string) => void;
}

const QuadrantMatrix: React.FC<QuadrantMatrixProps> = ({
                                                           data,
                                                           width = 800,
                                                           height = 600,
                                                           onClick,
                                                       }) => {
    const { t } = useTranslation();
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const margin = { top: 60, right: 100, bottom: 60, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);

        // Add axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        svg.append('g')
            .call(yAxis);

        // Add axes labels
        svg.append('text')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + 40)
            .attr('text-anchor', 'middle')
            .text(t('topic_difficulty'))
            .style('font-size', '14px')
            .style('fill', '#333');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .text(t('topic_career'))
            .style('font-size', '14px')
            .style('fill', '#333');

        // Draw quadrant lines
        svg.append('line')
            .attr('x1', xScale(50))
            .attr('y1', 0)
            .attr('x2', xScale(50))
            .attr('y2', innerHeight)
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '4,4');

        svg.append('line')
            .attr('x1', 0)
            .attr('y1', yScale(50))
            .attr('x2', innerWidth)
            .attr('y2', yScale(50))
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '4,4');

        // Add quadrant labels
        const quadrantFill = 'rgba(240, 240, 240, 0.5)';

        // Quadrant I: High Career, Low Difficulty
        svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', xScale(50))
            .attr('height', yScale(50))
            .style('fill', quadrantFill);

        svg.append('text')
            .attr('x', xScale(25))
            .attr('y', yScale(75))
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#1976d2')
            .style('font-weight', 'bold')
            .text('I: ' + t('quick_wins'));

        // Quadrant II: High Career, High Difficulty
        svg.append('rect')
            .attr('x', xScale(50))
            .attr('y', 0)
            .attr('width', xScale(50))
            .attr('height', yScale(50))
            .style('fill', quadrantFill);

        svg.append('text')
            .attr('x', xScale(75))
            .attr('y', yScale(75))
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#2e7d32')
            .style('font-weight', 'bold')
            .text('II: ' + t('strategic_investments'));

        // Quadrant III: Low Career, Low Difficulty
        svg.append('rect')
            .attr('x', 0)
            .attr('y', yScale(50))
            .attr('width', xScale(50))
            .attr('height', innerHeight - yScale(50))
            .style('fill', quadrantFill);

        svg.append('text')
            .attr('x', xScale(25))
            .attr('y', yScale(25))
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#ef6c00')
            .style('font-weight', 'bold')
            .text('III: ' + t('fill_in_projects'));

        // Quadrant IV: Low Career, High Difficulty
        svg.append('rect')
            .attr('x', xScale(50))
            .attr('y', yScale(50))
            .attr('width', xScale(50))
            .attr('height', innerHeight - yScale(50))
            .style('fill', quadrantFill);

        svg.append('text')
            .attr('x', xScale(75))
            .attr('y', yScale(25))
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#c62828')
            .style('font-weight', 'bold')
            .text('IV: ' + t('resource_drains'));

        // Draw bubbles for topics
        const bubbles = svg.selectAll('.bubble')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'bubble')
            .style('cursor', 'pointer')
            .on('click', function(_event, d) {
                if (onClick) onClick(d.id);
            });

        bubbles.append('circle')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', d => d.radius)
            .style('fill', d => d.color)
            .style('fill-opacity', 0.7)
            .style('stroke', d => d3.color(d.color)?.darker().toString() || d.color)
            .style('stroke-width', 1);

        bubbles.append('text')
            .attr('x', d => xScale(d.x))
            .attr('y', d => yScale(d.y))
            .attr('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .style('font-size', '10px')
            .style('fill', '#333')
            .style('pointer-events', 'none')
            .text(d => d.name);

        // Add tooltip on hover
        bubbles.append('title')
            .text(d => `${d.name}\n${t('topic_difficulty')}: ${d.x}\n${t('topic_career')}: ${d.y}\n${t('category')}: ${d.category}`);

        // Add legend for categories
        const categories = Array.from(new Set(data.map(d => d.category)));
        const legendWidth = 160;
        const legendX = innerWidth + 20;

        const legend = svg.append('g')
            .attr('transform', `translate(${legendX}, 0)`);

        legend.append('text')
            .attr('x', 0)
            .attr('y', -20)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(t('project_categories'));

        categories.forEach((category, i) => {
            const categoryColor = data.find(d => d.category === category)?.color || '#ccc';

            legend.append('rect')
                .attr('x', 0)
                .attr('y', i * 20)
                .attr('width', 12)
                .attr('height', 12)
                .style('fill', categoryColor);

            legend.append('text')
                .attr('x', 20)
                .attr('y', i * 20 + 10)
                .style('font-size', '12px')
                .style('alignment-baseline', 'middle')
                .text(category);
        });

    }, [data, width, height, t, onClick]);

    return <svg ref={svgRef} />;
};

export default QuadrantMatrix;