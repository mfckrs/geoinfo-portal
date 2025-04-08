import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import type { Skill, Difficulty } from '../../types';

interface SkillsBarChartProps {
    skills: Skill[];
    width?: number;
    height?: number;
}

const SkillsBarChart: React.FC<SkillsBarChartProps> = ({
                                                           skills,
                                                           width = 600,
                                                           height = 400,
                                                       }) => {
    const { t } = useTranslation();
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !skills.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const margin = { top: 20, right: 150, bottom: 60, left: 150 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create the SVG container
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Sort skills by level and then by type
        const sortedSkills = [...skills].sort((a, b) => {
            const levelOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
            return levelOrder[a.level] - levelOrder[b.level] || a.type.localeCompare(b.type);
        });

        // Define scales
        const yScale = d3.scaleBand()
            .domain(sortedSkills.map(skill => skill.name))
            .range([0, innerHeight])
            .padding(0.2);

        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, innerWidth]);

        // Add x axis
        svg.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d => `${d}%`))
            .selectAll('text')
            .style('font-size', '10px');

        // Add y axis
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .style('font-size', '10px')
            .attr('dx', '-0.5em')
            .attr('dy', '0.3em');

        // Define difficulty to value mapping
        const difficultyValue = (difficulty: Difficulty) => {
            switch(difficulty) {
                case 'High': return 90;
                case 'Medium': return 60;
                case 'Low': return 30;
                default: return 0;
            }
        };

        // Define color scale for skill types
        const colorScale = d3.scaleOrdinal<string>()
            .domain(['Technical', 'Soft'])
            .range(['#4285f4', '#34a853']);

        // Define difficulty color scale
        const difficultyColorScale = d3.scaleOrdinal<string>()
            .domain(['High', 'Medium', 'Low'])
            .range(['#ea4335', '#fbbc04', '#34a853']);

        // Create bars
        const bars = svg.selectAll('.bar')
            .data(sortedSkills)
            .enter()
            .append('g')
            .attr('class', 'bar');

        bars.append('rect')
            .attr('y', d => yScale(d.name) as number)
            .attr('height', yScale.bandwidth())
            .attr('x', 0)
            .attr('width', d => xScale(difficultyValue(d.level)))
            .attr('fill', d => colorScale(d.type))
            .attr('opacity', 0.8);

        // Add value labels
        bars.append('text')
            .attr('y', d => (yScale(d.name) as number) + yScale.bandwidth() / 2)
            .attr('x', d => xScale(difficultyValue(d.level)) + 5)
            .attr('dy', '0.35em')
            .text(d => d.level)
            .style('font-size', '10px')
            .style('fill', d => difficultyColorScale(d.level));

        // Add skill type indicators
        bars.append('circle')
            .attr('cy', d => (yScale(d.name) as number) + yScale.bandwidth() / 2)
            .attr('cx', -15)
            .attr('r', 5)
            .attr('fill', d => colorScale(d.type))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1);

        // Add legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${innerWidth + 20}, 0)`);

        // Type legend
        const typeLegend = legend.append('g')
            .attr('transform', 'translate(0, 0)');

        typeLegend.append('text')
            .attr('x', 0)
            .attr('y', -5)
            .text(t('skill_type'))
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        ['Technical', 'Soft'].forEach((type, i) => {
            const typeGroup = typeLegend.append('g')
                .attr('transform', `translate(0, ${i * 20 + 15})`);

            typeGroup.append('circle')
                .attr('r', 5)
                .attr('cx', 5)
                .attr('cy', 0)
                .attr('fill', colorScale(type));

            typeGroup.append('text')
                .attr('x', 15)
                .attr('y', 4)
                .text(t(type.toLowerCase() + '_skills'))
                .style('font-size', '10px');
        });

        // Level legend
        const levelLegend = legend.append('g')
            .attr('transform', 'translate(0, 70)');

        levelLegend.append('text')
            .attr('x', 0)
            .attr('y', -5)
            .text(t('skill_level'))
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        ['High', 'Medium', 'Low'].forEach((level, i) => {
            const levelGroup = levelLegend.append('g')
                .attr('transform', `translate(0, ${i * 20 + 15})`);

            levelGroup.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('x', 0)
                .attr('y', -5)
                .attr('fill', difficultyColorScale(level as Difficulty));

            levelGroup.append('text')
                .attr('x', 15)
                .attr('y', 3)
                .text(t(level.toLowerCase()))
                .style('font-size', '10px');
        });

    }, [skills, width, height, t]);

    return <svg ref={svgRef} />;
};

export default SkillsBarChart;