document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Code ---
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Auto Highlight ---
    
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Offset logic: triggers when you are 1/3 down the page into the section
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Loop through links to add/remove 'active' class
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the href includes the current section ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // =========================================================
    // 1. DATA DEFINITION (Graph & Modal Content)
    // =========================================================
    
    // Nodes: id = unique name, group = 'project' or 'skill'
    // Links: source -> target connections
const graphData = {
        nodes: [
            // --- PROJECTS (Blue Nodes) ---
            // Large Projects (FYP, GDBP)
            {id: "LM Health Knee Brace", group: "project", info: "Bluetooth-controlled pain relief module using Python & Flutter."},
            {id: "Non-Invasive Prosthetic Control", group: "project", info: "Final Year Project: Non-invasive control using EEG/EMG signals."},

            // Smaller Projects (CW & Personal)
            {id: "Neuron Spike Detector", group: "project", info: "CNN-based classifier for neuron spikes using PCA."},
            {id: "Genetic Algorithm Analysis", group: "project", info: "Analysis of Genetic Algorithms"},
            {id: "CoppeliaSim Robot Simulation", group: "project", info: "ROS-based obstacle avoidance and AI control."},
            {id: "FPGA RISC CPU", group: "project", info: "Designed a CPU and Pong game on Cyclone FPGA."},
            {id: "Nucleo Fan Controller", group: "project", info: "STM32-based fan speed controller with user interface."},

            // Technical Writing
            {id: "Biomimetic Shoulders Lit. Review", group: "project", info: "Review of kinematic architectures in upper-body robotics."},
            {id: "Healthtech Company Analysis", group: "project", info: "Market analysis and strategy for wearable health tech."},

            // --- SKILLS (Yellow Nodes) ---
            // Languages
            {id: "Python", group: "skill"},
            {id: "C/C++", group: "skill"},
            {id: "SystemVerilog", group: "skill"},
            {id: "Dart", group: "skill"},
            
            // Domain Specific
            {id: "ROS", group: "skill"},
            {id: "Embedded Systems", group: "skill"},
            {id: "Machine Learning", group: "skill"},
            {id: "Control Theory", group: "skill"},
            {id: "Signal Processing", group: "skill"},
            {id: "FPGA", group: "skill"},
            {id: "Hardware Design", group: "skill"},
            
            // Technologies/Tools
            {id: "Flutter", group: "skill"},
            {id: "Bluetooth LE", group: "skill"},
            {id: "STM32", group: "skill"},
            {id: "Arduino", group: "skill"},
            {id: "Linux", group: "skill"},

            // Misc.
            {id: "Technical Writing", group: "skill"},
            {id: "Business Analysis", group: "skill"},
            {id: "Market Research", group: "skill"},
            {id: "Robotics Design", group: "skill"}
        ],
        links: [
            // 1. LM Health Knee Brace (Repo: medical_lego_module_control)
            {source: "Python", target: "LM Health Knee Brace"},
            {source: "Flutter", target: "LM Health Knee Brace"},
            {source: "Bluetooth LE", target: "LM Health Knee Brace"},
            {source: "Embedded Systems", target: "LM Health Knee Brace"},
            {source: "Dart", target: "LM Health Knee Brace"},
            {source: "Linux", target: "LM Health Knee Brace"},
            {source: "Arduino", target: "LM Health Knee Brace"},
            {source: "Market Research", target: "LM Health Knee Brace"},
            {source: "Technical Writing", target: "LM Health Knee Brace"},
            {source: "Business Analysis", target: "LM Health Knee Brace"},

            // 2. Non-Invasive Prosthetic Control (Final Year Project)
            {source: "Control Theory", target: "Non-Invasive Prosthetic Control"},
            {source: "Signal Processing", target: "Non-Invasive Prosthetic Control"},
            // {source: "Python", target: "Non-Invasive Prosthetic Control"},
            {source: "Machine Learning", target: "Non-Invasive Prosthetic Control"},

            // 3. Neuron Spike Detector (Repo: Neuron-Spike-Classifier)
            {source: "Python", target: "Neuron Spike Detector"},
            {source: "Machine Learning", target: "Neuron Spike Detector"},
            {source: "Signal Processing", target: "Neuron Spike Detector"},

            // 4. CoppeliaSim Robot Simulation (CV Project)
            {source: "ROS", target: "CoppeliaSim Robot Simulation"},
            {source: "Python", target: "CoppeliaSim Robot Simulation"},
            {source: "Linux", target: "CoppeliaSim Robot Simulation"},
            {source: "Machine Learning", target: "CoppeliaSim Robot Simulation"},

            // 5. FPGA RISC CPU (Repo: FPGA-CPU-And-Pong-Game)
            {source: "SystemVerilog", target: "FPGA RISC CPU"},
            {source: "FPGA", target: "FPGA RISC CPU"},
            {source: "Hardware Design", target: "FPGA RISC CPU"},
            {source: "Embedded Systems", target: "FPGA RISC CPU"},

            // 6. Nucleo Fan Controller (Repo: Nucleo-Fan-Controller)
            {source: "STM32", target: "Nucleo Fan Controller"},
            {source: "C/C++", target: "Nucleo Fan Controller"},
            {source: "Embedded Systems", target: "Nucleo Fan Controller"},
            {source: "Hardware Design", target: "FPGA RISC CPU"},

            // 7. Biomimetic Shoulders Lit. Review (PDF)
            {source: "Technical Writing", target: "Biomimetic Shoulders Lit. Review"},
            {source: "Robotics Design", target: "Biomimetic Shoulders Lit. Review"},

            // 8. Healthtech Company Analysis (PDF)
            {source: "Technical Writing", target: "Healthtech Company Analysis"},
            {source: "Market Research", target: "Healthtech Company Analysis"},
            {source: "Business Analysis", target: "Healthtech Company Analysis"},

            // 9. GA Report
            {source: "Python", target: "Genetic Algorithm Analysis"},
            {source: "Technical Writing", target: "Genetic Algorithm Analysis"} 
        ]
    };

    // Mapping for Cards to Data (simple lookup)
    const projectDetails = {
        "smart-knee": graphData.nodes.find(n => n.id === "LM Health Knee Brace"),
        "shoulder-prosthetic": graphData.nodes.find(n => n.id === "Non-Invasive Prosthetic Control"),
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

    // Define Zoom Behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4]) // Limit zoom out/in
        .on("zoom", (event) => {
            svgGroup.attr("transform", event.transform);
        });

    // Initialize SVG
    const svg = d3.select("#graph-view").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom) // Attach zoom behavior
        .on("dblclick.zoom", null); // Disable double-click zoom
    
    const svgGroup = svg.append("g");

    // Simulation Setup (Physics)
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-200)) // Repel force
        //.force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(d => (d.connections * 3) + 30)) // Prevent overlap

        .force("y", d3.forceY(height / 2).strength(0.1))
        .force("x", d3.forceX(width / 2).strength(0.02));

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
        .attr("r", d => 5 + (d.connections * 1.5)) // Size based on connections
        .attr("fill", d => d.group === 'project' ? colorProject : colorSkill)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("cursor", "pointer")
        .call(drag(simulation))

        // --- HOVER INTERACTION LOGIC ---
        .on("mouseover", (event, d) => {
            const neighborIds = new Set();
            neighborIds.add(d.id);

            // 1. Animate Links
            link.transition().duration(250)
                .style("stroke", l => {
                    const isConnected = l.source.id === d.id || l.target.id === d.id;
                    if (isConnected) {
                        neighborIds.add(l.source.id === d.id ? l.target.id : l.source.id);
                        return "#64ffda"; // Glow color
                    }
                    return "#555";
                })
                .style("stroke-opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1)
                .style("stroke-width", l => (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1.5);

            // 2. Animate Nodes (Dim unrelated ones)
            node.transition().duration(250)
                .style("opacity", n => neighborIds.has(n.id) ? 1 : 0.1);

            // 3. Animate Labels
            label.transition().duration(250)
                .style("opacity", n => neighborIds.has(n.id) ? 1 : 0.1);
        })
        .on("mouseout", () => {
            // --- RESET WITH FADE OUT ---
            link.transition().duration(250)
                .style("stroke", "#555")
                .style("stroke-opacity", 0.6)
                .style("stroke-width", 1.5);
            
            node.transition().duration(250)
                .style("opacity", 1);
                
            label.transition().duration(250)
                .style("opacity", 1);
        });

    // Draw Labels
    const label = svgGroup.append("g")
        .selectAll("text")
        .data(graphData.nodes)
        .join("text")
        .text(d => d.id)
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .attr("text-anchor", "middle") // Centers text horizontally
        .attr("pointer-events", "none") // Prevents text from interfering with drag clicks
        .attr("dy", d => {
            // Calculate the radius exactly as we did for the node: 5 + (connections * 2)
            const radius = 5 + (d.connections * 2);
            // Add radius + padding (e.g., 15px) to push text below the circle
            return radius + 15; 
        });

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