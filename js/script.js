document.addEventListener('DOMContentLoaded', () => {
    
    // --- Existing Navbar Code ---
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // =========================================================
    // 1. DATA DEFINITION (Graph & Modal Content)
    // =========================================================
    
    // Nodes: id = unique name, group = 'project' or 'skill'
    // Links: source -> target connections
    const graphData = {
        nodes: [
            // Projects (Blue)
            { id: "Smart Knee Brace", group: "project", info: "Integration & Control systems for pain relief." },
            { id: "Shoulder Prosthetic", group: "project", info: "Non-invasive control using EEG/EMG." },
            { id: "Spike Detector", group: "project", info: "Neural Network based spike detection." },
            { id: "Robot Simulation", group: "project", info: "ROS based obstacle avoidance." },
            
            // Skills (Yellow)
            { id: "Python", group: "skill" },
            { id: "C++", group: "skill" },
            { id: "ROS", group: "skill" },
            { id: "MATLAB", group: "skill" },
            { id: "Embedded Systems", group: "skill" },
            { id: "Machine Learning", group: "skill" },
            { id: "Control Theory", group: "skill" },
            { id: "PCB Design", group: "skill" }
        ],
        links: [
            // Smart Knee connections
            { source: "Python", target: "Smart Knee Brace" },
            { source: "Embedded Systems", target: "Smart Knee Brace" },
            { source: "PCB Design", target: "Smart Knee Brace" },

            // Shoulder Prosthetic connections
            { source: "Control Theory", target: "Shoulder Prosthetic" },
            { source: "Python", target: "Shoulder Prosthetic" },
            { source: "Machine Learning", target: "Shoulder Prosthetic" },
            { source: "MATLAB", target: "Shoulder Prosthetic" },

            // Spike Detector connections
            { source: "Python", target: "Spike Detector" },
            { source: "Machine Learning", target: "Spike Detector" },
            
            // Robot Sim connections
            { source: "ROS", target: "Robot Simulation" },
            { source: "C++", target: "Robot Simulation" },
            { source: "Python", target: "Robot Simulation" }
        ]
    };

    // Mapping for Cards to Data (simple lookup)
    const projectDetails = {
        "smart-knee": graphData.nodes.find(n => n.id === "Smart Knee Brace"),
        "shoulder-prosthetic": graphData.nodes.find(n => n.id === "Shoulder Prosthetic"),
        "spike-detector": graphData.nodes.find(n => n.id === "Spike Detector")
    };

    // =========================================================
    // 2. D3.js GRAPH VISUALIZATION
    // =========================================================
    
    const container = document.getElementById('graph-view');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Colors
    const colorProject = "#2196F3"; // Blue
    const colorSkill = "#FFD700";   // Yellow (Gold)

    // Calculate node size based on connections (Degree Centrality)
    graphData.nodes.forEach(node => {
        node.connections = graphData.links.filter(l => l.source === node.id || l.target === node.id).length;
    });

    // Initialize SVG
    const svg = d3.select("#graph-view").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on("zoom", (event) => {
            svgGroup.attr("transform", event.transform);
        }))
        .append("g");
    
    const svgGroup = svg.append("g");

    // Simulation Setup (Physics)
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300)) // Repel force
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(d => (d.connections * 3) + 15)); // Prevent overlap

    // Draw Lines
    const link = svgGroup.append("g")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(graphData.links)
        .join("line")
        .attr("stroke-width", 1.5);

    // Draw Nodes
    const node = svgGroup.append("g")
        .selectAll("circle")
        .data(graphData.nodes)
        .join("circle")
        .attr("r", d => 5 + (d.connections * 2)) // Size based on connections
        .attr("fill", d => d.group === 'project' ? colorProject : colorSkill)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("cursor", "pointer")
        .call(drag(simulation));

    // Draw Labels
    const label = svgGroup.append("g")
        .selectAll("text")
        .data(graphData.nodes)
        .join("text")
        .text(d => d.id)
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .attr("dx", 12)
        .attr("dy", 4);

    // Update positions on each tick
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
            
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    // Drag Functions
    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // =========================================================
    // 3. MODAL INTERACTION LOGIC
    // =========================================================
    
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-description");
    const modalTags = document.getElementById("modal-tags");

    function openModal(data) {
        if(!data) return;

        modalTitle.textContent = data.id; // Or data.title if you add that property
        modalDesc.textContent = data.info || "More details about this skill/project...";
        
        // Clear old tags
        modalTags.innerHTML = '';
        
        // Find related connections for tags
        const related = graphData.links
            .filter(l => l.source.id === data.id || l.target.id === data.id)
            .map(l => l.source.id === data.id ? l.target.id : l.source.id);
            
        related.forEach(tag => {
            const span = document.createElement("span");
            span.classList.add("tag-badge");
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        modal.classList.add("show");
    }

    // A. Click on Graph Node
    node.on("click", (event, d) => {
        openModal(d);
    });

    // B. Click on Project Card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = projectDetails[id];
            openModal(data);
        });
    });

    // C. Close Modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});