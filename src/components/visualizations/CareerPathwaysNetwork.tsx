import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import type { CareerPathway } from '../../types';

interface CareerPathwaysNetworkProps {
    data: {
        nodes: {
            id: string;
            name: string;
            type: 'sector' | 'role' | 'skill';
            value: number;
            group: number;
        }[];
        links: {
            source: string;
            target: string;
            value: number;
        }[];
    };
    width?: number;
    height?: number;
}

const CareerPathwaysNetwork: React.FC<CareerPathwaysNetworkProps> = ({
                                                                         data,
                                                                         width = 800,
                                                                         height = 600,
                                                                     }) => {
    const { t } = useTranslation();
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data.nodes.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Create a group for the graph
        const g = svg.append('g');

        // Add zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([0.2, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom as any);

        // Create a force simulation
        const simulation = d3.forceSimulation(data.nodes as any)
            .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius((d: any) => d.value * 2 + 10));

        // Define color scale for node types
        const colorScale = d3.scaleOrdinal<string>()
            .domain(['sector', 'role', 'skill'])
            .range(['#4285f4', '#34a853', '#fbbc04']);

        // Create links
        const link = g.append('g')
            .selectAll('line')
            .data(data.links)
            .enter()
            .append('line')
            .attr('stroke-width', (d) => Math.sqrt(d.value))
            .attr('stroke', '#ccc')
            .attr('stroke-opacity', 0.6);

        // Create node groups
        const node = g.append('g')
            .selectAll('.node')
            .data(data.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended) as any);

        // Add circles to nodes
        node.append('circle')
            .attr('r', (d) => d.value * 2 + 5)
            .attr('fill', (d) => colorScale(d.type))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5);

        // Add labels to nodes
        node.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .text((d) => d.name)
            .style('font-size', '10px')
            .style('fill', '#333')
            .style('pointer-events', 'none');

        // Add title for hover tooltips
        node.append('title')
            .text((d) => d.name);

        // Update positions on each tick of the simulation
        simulation.on('tick', () => {
            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);

            node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
        });

        // Define drag functions
        function dragstarted(event: any, d: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: any, d: any) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: any, d: any) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Add legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(20, 20)`);

        const legendData = [
            { type: 'sector', label: t('sector_government') },
            { type: 'role', label: t('career_pathways_title') },
            { type: 'skill', label: t('key_skills') },
        ];

        legendData.forEach((item, i) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${i * 20})`);

            legendRow.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', colorScale(item.type));

            legendRow.append('text')
                .attr('x', 20)
                .attr('y', 8)
                .text(item.label)
                .style('font-size', '12px')
                .style('fill', '#333');
        });

    }, [data, width, height, t]);

    return <svg ref={svgRef} />;
};

export default CareerPathwaysNetwork;