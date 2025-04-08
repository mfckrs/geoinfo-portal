import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Resource } from '../../types';

interface EducationalContentViewerProps {
    resource: Resource;
    content: string;
}

// This component is used to display the educational content from the document
// It renders formatted text with sections, code blocks, and links
const EducationalContentViewer: React.FC<EducationalContentViewerProps> = ({ resource, content }) => {
    const { t } = useTranslation();

    // Helper function to parse content sections
    const renderContent = (content: string) => {
        // Split the content into sections based on headings
        const sections = content.split(/(?=##?\s)/);

        return sections.map((section, index) => {
            // Check if section starts with heading
            const isH2 = section.startsWith('## ');
            const isH3 = section.startsWith('### ');

            let title = '';
            let body = section;

            if (isH2 || isH3) {
                // Extract heading and body
                const lines = section.split('\n');
                title = lines[0].replace(/^#+ /, '');
                body = lines.slice(1).join('\n');
            }

            return (
                <div key={index} className="content-section">
                    {title && (
                        <h3 className={isH2 ? 'section-title' : 'subsection-title'}>
                            {title}
                        </h3>
                    )}
                    {renderBodyContent(body)}
                </div>
            );
        });
    };

    // Helper function to parse body content with code blocks, links, etc.
    const renderBodyContent = (body: string) => {
        // Replace code blocks
        let processedBody = body.replace(
            /```([a-z]*)\n([\s\S]*?)```/g,
            (match, language, code) => `<pre class="code-block ${language}"><code>${code}</code></pre>`
        );

        // Replace inline code
        processedBody = processedBody.replace(
            /`([^`]+)`/g,
            (match, code) => `<code class="inline-code">${code}</code>`
        );

        // Replace links
        processedBody = processedBody.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            (match, text, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
        );

        // Replace bullet points
        processedBody = processedBody.replace(
            /^\s*-\s+(.*)/gm,
            (match, item) => `<li>${item}</li>`
        );

        // Wrap bullet points in ul tags
        processedBody = processedBody.replace(
            /(<li>.*<\/li>)(\s*)(?!<li>)/gs,
            (match, list) => `<ul class="content-list">${list}</ul>`
        );

        // Handle paragraphs
        processedBody = processedBody
            .split('\n\n')
            .filter(p => p.trim() !== '')
            .map(p => {
                // Skip if already wrapped in HTML tags
                if (p.startsWith('<') && p.endsWith('>')) return p;
                return `<p>${p}</p>`;
            })
            .join('');

        return <div dangerouslySetInnerHTML={{ __html: processedBody }} />;
    };

    if (!content) {
        return <div className="no-content">{t('no_content_available')}</div>;
    }

    return (
        <div className="educational-content-viewer">
            <h2 className="content-title">{resource.title}</h2>
            <div className="content-metadata">
                <div className="resource-type">
                    {t(`resource_type_${resource.type.toLowerCase()}`)}
                </div>
                <div className="resource-difficulty">
                    {t('difficulty')}: {t(resource.difficulty.toLowerCase())}
                </div>
            </div>

            <div className="content-body">
                {renderContent(content)}
            </div>

            <div className="content-footer">
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                >
                    {t('view_original_resource')}
                </a>
            </div>
        </div>
    );
};

export default EducationalContentViewer;