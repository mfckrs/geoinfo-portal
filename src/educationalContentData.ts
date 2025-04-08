import type {Resource} from './types';

export const educationalResources: Resource[] = [
    {
        id: 'photogrammetry-intro',
        title: 'Introduction to Photogrammetry & Remote Sensing',
        description: 'Comprehensive overview of photogrammetry concepts, Structure from Motion (SfM) techniques, and remote sensing applications.',
        type: 'Documentation',
        url: 'https://gistbok-ltb.ucgis.org/27/concept/8308',
        categories: ['photogrammetry', 'remote-sensing'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['photogrammetry', 'SfM', 'remote sensing', 'theory']
    },
    {
        id: 'agisoft-tutorials',
        title: 'Agisoft Metashape Tutorials & User Manual',
        description: 'Official documentation and tutorials for Agisoft Metashape photogrammetry software, covering workflows like orthomosaic/DEM generation and GCP processing.',
        type: 'Tutorial',
        url: 'https://www.agisoft.com/support/tutorials/',
        categories: ['photogrammetry', 'software'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['agisoft', 'metashape', 'software', 'tutorial', 'GCP', 'orthomosaic']
    },
    {
        id: 'pix4d-documentation',
        title: 'Pix4D Support Documentation',
        description: 'Step-by-step guides for drone mapping projects using Pix4D software, including video tutorials and knowledge base articles.',
        type: 'Documentation',
        url: 'https://support.pix4d.com/hc/pix4dmapper/how-to-step-by-step-instructions',
        categories: ['photogrammetry', 'software', 'drone'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['pix4d', 'drone', 'mapping', 'tutorial']
    },
    {
        id: 'arcgis-imagery',
        title: 'Imagery and Remote Sensing in ArcGIS',
        description: 'ArcGIS Pro documentation outlining imagery and raster analysis capabilities for remote sensing, including classification tools and raster functions.',
        type: 'Documentation',
        url: 'https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/imagery-and-remote-sensing-in-arcgis.htm',
        categories: ['remote-sensing', 'gis', 'software'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['arcgis', 'imagery', 'classification', 'raster']
    },
    {
        id: 'gnss-errors',
        title: 'Errors in GNSS',
        description: 'Comprehensive overview of error sources in GNSS measurements, categorizing errors into satellite, signal, and receiver-related issues.',
        type: 'Academic',
        url: 'https://usq.pressbooks.pub/gpsandgnss/chapter/3-5-errors-in-gnss/',
        categories: ['gnss', 'mapping'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['gnss', 'gps', 'errors', 'accuracy']
    },
    {
        id: 'rtklib-tutorial',
        title: 'Post-Processing GNSS Data With RTKlib',
        description: 'Practical guide to post-process GNSS data using the open-source RTKLIB software, explaining how to compute precise baselines and apply corrections.',
        type: 'Tutorial',
        url: 'https://badelfllc.zohodesk.com/portal/en/kb/articles/post-processing-gnss-data-with-rtklib-introduction',
        categories: ['gnss', 'software'],
        language: 'en',
        difficulty: 'High',
        tags: ['rtklib', 'gnss', 'post-processing', 'tutorial']
    },
    {
        id: 'gnss-corrections',
        title: 'GNSS Corrections Demystified',
        description: 'Detailed explanation of GNSS correction methods including SBAS, RTK, and PPP, with comparisons of different approaches.',
        type: 'Documentation',
        url: 'https://www.septentrio.com/en/learn-more/insights/gnss-corrections-demystified',
        categories: ['gnss', 'mapping'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['gnss', 'rtk', 'corrections', 'tutorial']
    },
    {
        id: 'point-cloud-registration',
        title: 'A Tutorial Review on Point Cloud Registration',
        description: 'Comprehensive review of point cloud registration techniques, explaining algorithms like ICP and feature-based methods.',
        type: 'Academic',
        url: 'https://onlinelibrary.wiley.com/doi/10.1155/2021/9953910',
        categories: ['laser-scanner', 'scan-to-bim'],
        language: 'en',
        difficulty: 'High',
        tags: ['point cloud', 'registration', 'ICP', 'algorithm']
    },
    {
        id: 'civil3d-survey',
        title: 'Civil 3D Surveyors Workshop',
        description: 'Tutorial on using AutoCAD Civil 3D for survey data processing, including survey database setup, importing fieldbooks, and creating parcels.',
        type: 'Tutorial',
        url: 'https://www.youtube.com/watch?v=Yf2UuxYfAFc',
        categories: ['surveying', 'software'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['civil3d', 'surveying', 'autocad', 'tutorial']
    },
    {
        id: 'digital-twin-intro',
        title: 'What Is a Digital Twin?',
        description: 'Introduction to the concept of digital twins, explaining their use cases, benefits, and implementation approaches.',
        type: 'Documentation',
        url: 'https://www.ibm.com/think/topics/what-is-a-digital-twin',
        categories: ['digital-twin'],
        language: 'en',
        difficulty: 'Low',
        tags: ['digital twin', 'IoT', 'simulation', 'introduction']
    },
    {
        id: 'ai-surveying-integration',
        title: 'The Integration of AI and Machine Learning into 3D Data',
        description: 'Overview of how AI is transforming surveying workflows, from point cloud classification to complete analysis.',
        type: 'Academic',
        url: 'https://www.geo-week.com/session/the-integration-of-ai-and-machine-learning-into-3d-data/',
        categories: ['ai-surveying', 'laser-scanner'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['AI', 'machine learning', 'point cloud', 'classification']
    },
    {
        id: 'revit-point-cloud',
        title: 'How to Import Point Cloud In Revit for Asbuilt Modeling',
        description: 'Step-by-step guide for importing and working with point cloud data in Revit for Scan-to-BIM workflows.',
        type: 'Tutorial',
        url: 'https://realityimt.com/industry-insights/import-point-cloud-in-revit/',
        categories: ['scan-to-bim', 'laser-scanner'],
        language: 'en',
        difficulty: 'Medium',
        tags: ['revit', 'point cloud', 'scan-to-bim', 'tutorial']
    }
];

// Content for the educational resources
export const educationalContent: Record<string, string> = {
    'photogrammetry-intro': `## Introduction to Photogrammetry & Remote Sensing

Photogrammetry involves creating 3D models from overlapping images (using **Structure from Motion**, multi-view stereo, etc.), while remote sensing focuses on analyzing satellite/aerial imagery for mapping and information extraction.

### Structure from Motion (SfM)

Structure from Motion (SfM) is a photogrammetric technique that estimates three-dimensional structures from two-dimensional image sequences. Unlike traditional photogrammetry, SfM works with uncalibrated imagery captured from multiple viewpoints.

The basic workflow includes:
- Image acquisition (with sufficient overlap)
- Detecting feature points (like SIFT or SURF)
- Matching feature points across images
- Estimating camera positions
- Creating a sparse point cloud
- Densifying the point cloud
- Generating a mesh or other deliverables

### Remote Sensing Fundamentals

Remote sensing involves acquiring information about the Earth's surface without direct contact. Key concepts include:

- **Electromagnetic spectrum**: Different wavelengths provide different information
- **Resolution types**: Spatial, spectral, radiometric, and temporal
- **Sensor types**: Passive vs. active sensors
- **Classification methods**: Supervised vs. unsupervised
- **Common indices**: NDVI, EVI, NDWI for vegetation and water analysis

### Applications

- **Precision agriculture**: Crop health monitoring, yield prediction
- **Disaster monitoring**: Damage assessment, emergency response
- **Urban planning**: Land cover analysis, urban sprawl detection
- **Environmental monitoring**: Deforestation tracking, coastal erosion measurement
- **3D modeling**: Digital terrain models, building reconstruction

### Key Software

- **Agisoft Metashape**: Professional photogrammetry software for 3D model creation
- **Pix4D**: Drone mapping software suite
- **QGIS/ArcGIS**: GIS software with remote sensing capabilities
- **OpenDroneMap**: Open-source photogrammetry toolkit

### Best Practices

- Always use proper ground control points (GCPs) for accurate georeferencing
- Ensure sufficient image overlap (70-80% front, 60-70% side)
- Consider camera calibration for precise measurements
- Process areas in manageable chunks for large projects
- Validate results against known measurements`,

    'gnss-errors': `## Understanding Errors in GNSS

Global Navigation Satellite Systems (GNSS) provide positioning, navigation, and timing services worldwide. However, GNSS measurements are subject to various errors that affect accuracy.

### Sources of GNSS Errors

Errors in GNSS can be categorized into three main types:

#### 1. Satellite-related Errors
- **Orbit errors**: Inaccuracies in the broadcast ephemeris data
- **Clock errors**: Satellite atomic clock drift and offset
- **Satellite geometry**: Poor distribution of satellites (measured as DOP - Dilution of Precision)

#### 2. Signal Propagation Errors
- **Ionospheric delay**: Signal delay in the ionosphere (40-60 km to 1,000 km above Earth)
- **Tropospheric delay**: Signal delay in the troposphere (0-12 km above Earth)
- **Multipath**: Signal reflection from surfaces before reaching the receiver

#### 3. Receiver-related Errors
- **Receiver clock errors**: Inaccuracies in the receiver's clock
- **Antenna phase center variations**: Offset between physical antenna center and electrical phase center
- **Measurement noise**: Random errors in signal tracking

### Correction Methods

Several methods can reduce or eliminate these errors:

- **Differential GNSS (DGNSS)**: Uses reference stations to provide corrections
- **Real-Time Kinematic (RTK)**: Provides centimeter-level accuracy using carrier phase measurements
- **Precise Point Positioning (PPP)**: Uses precise satellite orbits and clock information
- **Network RTK**: Uses a network of reference stations for improved coverage and reliability

### Best Practices for Minimizing Errors

- Use dual-frequency receivers to eliminate first-order ionospheric effects
- Ensure good satellite geometry (low DOP values)
- Use appropriate antenna height and measure accurately
- Avoid obstructions that could cause multipath or signal blockage
- Apply appropriate masks for elevation angle and signal quality
- For high-precision work, use RTK or PPK (Post-Processed Kinematic) techniques

### Performance Expectations

- Single-frequency standalone GNSS: 2-5 meters accuracy
- Dual-frequency standalone GNSS: 1-2 meters accuracy
- DGNSS: Sub-meter accuracy
- RTK GNSS: 1-5 centimeters accuracy
- Static GNSS (long observation): Millimeter accuracy`,

    'digital-twin-intro': `## What Is a Digital Twin?

A digital twin is a virtual representation of a physical asset, environment, or system, kept in sync with real-world data. It enables monitoring, analysis, simulation, and optimization of the physical counterpart.

### Components of a Digital Twin

A complete digital twin consists of several key components:

1. **Physical entity**: The real-world object, building, infrastructure, or system being modeled
2. **Virtual model**: 3D representation with accurate geometry and attributes
3. **Data connection**: Links between the physical and virtual worlds (sensors, IoT devices)
4. **Analytics engine**: Software that processes incoming data
5. **User interface**: Visualization and interaction capabilities

### Types of Digital Twins

- **Component twins**: Individual parts or components
- **Asset twins**: Complete machines or equipment
- **System twins**: Interconnected assets functioning together
- **Process twins**: Business or operational processes
- **City/Environment twins**: Large-scale environments like cities or regions

### Digital Twin Use Cases

#### Smart Cities and Urban Planning
- Traffic monitoring and optimization
- Utility network management
- Disaster response planning
- Urban development simulation

#### Building Management
- Energy consumption monitoring
- Predictive maintenance
- Space utilization analysis
- Indoor environmental quality management

#### Infrastructure Management
- Structural health monitoring
- Infrastructure lifecycle management
- Maintenance scheduling
- Performance optimization

### Implementation Steps

1. **Define objectives**: Identify specific goals and use cases
2. **Create the model**: Develop a 3D representation (from BIM, CAD, GIS, laser scanning)
3. **Connect data sources**: Integrate IoT sensors, operational systems, and historical data
4. **Implement analytics**: Set up data processing, machine learning, and simulation capabilities
5. **Develop visualization**: Create intuitive interfaces to interact with the twin
6. **Maintain and update**: Ensure the twin remains synchronized with reality

### Challenges and Considerations

- Data quality and consistency requirements
- Integration with existing systems
- Security and privacy concerns
- Scalability as systems grow
- Keeping the twin updated with physical changes

### Technology Standards

- **CityGML**: Open standard for 3D city models
- **BIM (IFC)**: Building Information Modeling standard
- **Digital Twin Consortium**: Working on interoperability standards
- **ISO/IEC JTC 1**: Digital Twin standards development`,

    'ai-surveying-integration': `## AI and Machine Learning in Surveying

The integration of Artificial Intelligence (AI) and Machine Learning (ML) is transforming the field of surveying, especially in processing and analyzing 3D data from photogrammetry and laser scanning.

### Key Applications of AI in Surveying

#### Automated Feature Extraction
- Building footprint extraction from aerial imagery
- Road network detection from satellite data
- Tree and vegetation identification in point clouds
- Power line and pole detection in LiDAR data

#### Point Cloud Classification
- Automatic classification of ground vs. non-ground points
- Segmentation of buildings, vegetation, roads, and other features
- Material identification based on spectral and geometric properties
- Indoor/outdoor object recognition

#### Data Quality Improvement
- Noise reduction in point clouds
- Gap filling in 3D models
- Automatic error detection in survey measurements
- Enhancement of low-resolution imagery

#### Predictive Analytics
- Predicting terrain stability and landslide risk
- Estimating construction costs from 3D scan data
- Forecasting urban development patterns
- Detecting structural changes over time

### AI Techniques Used in Surveying

#### Computer Vision
- Convolutional Neural Networks (CNNs) for image classification
- Object detection algorithms (YOLO, R-CNN) for feature identification
- Semantic segmentation for land cover mapping
- Image matching and registration

#### Point Cloud Processing
- Deep learning for point cloud classification (PointNet, PointNet++)
- Clustering algorithms for object segmentation
- RANSAC for geometric primitive fitting
- Graph neural networks for 3D structural analysis

#### Traditional Machine Learning
- Random Forest for feature classification
- Support Vector Machines for terrain analysis
- K-means clustering for data segmentation
- Regression models for prediction tasks

### Implementation Workflow

1. **Data acquisition**: Collect survey data (images, point clouds, etc.)
2. **Data preparation**: Clean, normalize, and format data for AI processing
3. **Training data creation**: Label or annotate subset of data (for supervised learning)
4. **Model selection**: Choose appropriate AI algorithm for the task
5. **Training and validation**: Train model and validate performance
6. **Deployment**: Integrate model into production workflow
7. **Monitoring**: Continuously evaluate model performance

### Challenges and Considerations

- Need for extensive training data with accurate labels
- Computational resources required for processing large datasets
- Integration with traditional surveying workflows
- Quality assurance and validation of AI-derived results
- Addressing ethical considerations and potential biases

### Future Directions

- Real-time AI processing in the field
- Combined sensor fusion with AI interpretation
- Autonomous survey systems with minimal human intervention
- Improved transfer learning for surveying applications
- Integration with Digital Twin and BIM technologies`
};