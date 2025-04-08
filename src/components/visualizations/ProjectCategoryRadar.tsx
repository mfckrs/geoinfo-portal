import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';

interface RadarChartProps {
    categories: string[];
    datasets: {
        name: string;
        color: string;
        values: number[];
    }[];
    width?: number;
    height?: number;
}

const ProjectCategoryRadar: React.FC<RadarChartProps> = ({
                                                             categories,
                                                             datasets,
                                                             width = 500,
                                                             height = 500,
                                                         }) => {
    const { t } = useTranslation();
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !categories.length || !datasets.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const margin = { top: 50, right: 80, bottom: 50, left: 80 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Define the angles based on the number of categories
        const angleSlice = (Math.PI * 2) / categories.length;

        // Scale for the radius
        const rScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, radius]);

        // Create the circular grid
        const levels = 5;
        const gridCircles = svg.selectAll('.gridCircle')
            .data(d3.range(1, levels + 1).reverse())
            .enter()
            .append('circle')
            .attr('class', 'gridCircle')
            .attr('r', d => radius * d / levels)
            .style('fill', '#f0f0f0')
            .style('stroke', '#ccc')
            .style('fill-opacity', 0.1);

        // Text labels for each level
        const axisGrid = svg.selectAll('.axisLabel')
            .data(d3.range(1, levels + 1).reverse())
            .enter()
            .append('text')
            .attr('class', 'axisLabel')
            .attr('x', 4)
            .attr('y', d => -d * radius / levels)
            .attr('dy', '0.4em')
            .style('font-size', '10px')
            .style('fill', '#666')
            .text(d => Math.round(d * 100 / levels));

        // Create the axes
        const axes = svg.selectAll('.axis')
            .data(categories)
            .enter()
            .append('g')
            .attr('class', 'axis');

        // Draw the lines
        axes.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
            .style('stroke', '#ccc')
            .style('stroke-width', '1px');

        // Add labels
        axes.append('text')
            .attr('class', 'legend')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('x', (d, i) => rScale(100 + 20) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y', (d, i) => rScale(100 + 20) * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => t(d))
            .style('font-size', '11px')
            .style('fill', '#333');

        // Create the radar chart paths
        const radarLine = d3.lineRadial<number>()
            .radius(d => rScale(d))
            .angle((d, i) => i * angleSlice)
            .curve(d3.curveLinearClosed);

        // Add radar areas
        datasets.forEach((dataset, i) => {
            // Draw the path
            svg.append('path')
                .datum(dataset.values)
                .attr('class', 'radarArea')
                .attr('d', radarLine)
                .style('fill', dataset.color)
                .style('fill-opacity', 0.1)
                .style('stroke', dataset.color)
                .style('stroke-width', 2)
                .style('pointer-events', 'all');

            // Add data points
            svg.selectAll(`.radarCircle-${i}`)
                .data(dataset.values)
                .enter()
                .append('circle')
                .attr('class', `radarCircle-${i}`)
                .attr('r', 4)
                .attr('cx', (d, j) => rScale(d) * Math.cos(angleSlice * j - Math.PI / 2))
                .attr('cy', (d, j) => rScale(d) * Math.sin(angleSlice * j - Math.PI / 2))
                .style('fill', dataset.color)
                .style('fill-opacity', 0.8);
        });

        // Add legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${radius + 20}, ${-radius + 20})`);

        datasets.forEach((dataset, i) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${i * 20})`);

            legendRow.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .style('fill', dataset.color);

            legendRow.append('text')
                .attr('x', 15)
                .attr('y', 10)
                .text(dataset.name)
                .style('font-size', '12px')
                .style('fill', '#333');
        });

    }, [categories, datasets, width, height, t]);

    return <svg ref={svgRef} />;
};

export default ProjectCategoryRadar;