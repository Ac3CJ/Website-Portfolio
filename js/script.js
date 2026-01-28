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

    // --- RICH CONTENT DATA STORE ---
    const richProjectData = {
        // FIXED: Key must match the node ID exactly ("LM Health Knee Brace")
        "LM Health Knee Brace": `
            <div class="tech-stack-container">
                <span class="tech-badge">Flutter / Dart</span>
                <span class="tech-badge">C++ (Embedded)</span>
                <span class="tech-badge">Bluetooth LE</span>
                <span class="tech-badge">System Architecture</span>
            </div>

            <img src="./images/lm-health-subsystem-diagram.png" class="project-full-img" alt="Subsystem Integration Diagram">

            <p style="color: #ccc; line-height: 1.6;">
                Engineered the <strong>Integration & Control sub-system</strong> for a modular smart knee brace designed for rehabilitation and pain relief. 
                The system bridges high-level user inputs with low-level hardware control using a robust BLE network.
            </p>

            <h3 class="project-section-title">Key Engineering Features</h3>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h4><i class="fa-solid fa-mobile-screen" style="color:#64ffda;"></i> Cross-Platform App</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        Developed a <strong>Flutter-based mobile application</strong> serving as the central control hub. 
                        Features include real-time device scanning, user profiles, and a dynamic dashboard for therapy management.
                    </p>
                </div>

                <div class="feature-card">
                    <h4><i class="fa-brands fa-bluetooth-b" style="color:#2196F3;"></i> BLE Communication</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        Implemented a custom BLE protocol using <strong>UUID-based Services and Characteristics</strong>. 
                        Ensures low-latency communication between the central hub and multiple peripheral therapy modules.
                    </p>
                </div>

                <div class="feature-card">
                    <h4><i class="fa-solid fa-microchip" style="color:#FFD700;"></i> OOP Firmware</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        Designed modular C++ firmware using <strong>Object-Oriented Programming</strong>. 
                        Utilized state machines to manage "Active" and "Inactive" therapy states safely and efficiently.
                    </p>
                </div>
            </div>

            <h3 class="project-section-title">Testing & Validation Setup</h3>
            
            <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
                To validate the system architecture before hardware integration, a <strong>Virtual Peripheral</strong> was engineered using <strong>Linux Debian</strong>. 
                By leveraging <strong>Python</strong> and the <strong>BlueZ</strong> stack, I simulated the BLE characteristics of the physical knee brace, allowing for rapid iteration of the Flutter control logic without hardware dependencies.
            </p>

            <img src="./images/testing-configuration.png" class="project-full-img" alt="Testing Configuration Setup with Arduino and Linux">

            <h3 class="project-section-title">System Highlights</h3>
            <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                <li><strong>Scalable Architecture:</strong> Decoupled UI from hardware logic for easy expansion.</li>
                <li><strong>Robust Error Handling:</strong> Automatic reconnection and signal loss management.</li>
            </ul>
        `,

        "Neuron Spike Detector": `
            <div class="tech-stack-container">
                <span class="tech-badge">Python 3.12</span>
                <span class="tech-badge">PyTorch (CNN)</span>
                <span class="tech-badge">Scikit-learn (PCA)</span>
                <span class="tech-badge">Signal Processing</span>
            </div>

            <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                Developed a hybrid signal processing pipeline to detect and classify neural spikes from raw brain wave data. 
                The system utilizes a <strong>1D Convolutional Neural Network (CNN)</strong> for peak detection and a <strong>PCA-based Multi-Layer Perceptron (MLP)</strong> for classification.
            </p>

            <h3 class="project-section-title">System Architecture</h3>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h4><i class="fa-solid fa-wave-square" style="color:#64ffda; margin-right:8px;"></i> Pre-Processing</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        Signals are cleaned using a median subtraction filter for drift removal, a Savitzky-Golay filter for high-frequency noise, and <strong>wavelet denoising</strong> for smoothing.
                    </p>
                </div>

                <div class="feature-card">
                    <h4><i class="fa-solid fa-magnifying-glass-chart" style="color:#2196F3; margin-right:8px;"></i> CNN Detection</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        A 1D CNN with ReLU and max-pooling slides across the signal to isolate potential spikes. 
                        This approach ensures <strong>translation invariance</strong> and robustness against phase shifts.
                    </p>
                </div>

                <div class="feature-card">
                    <h4><i class="fa-solid fa-network-wired" style="color:#FFD700; margin-right:8px;"></i> PCA-MLP Classifier</h4>
                    <p style="font-size: 0.9rem; color: #a0a0a0;">
                        Detected spikes are dimensionality-reduced to <strong>50 components</strong> using PCA. 
                        These features are fed into a 3-layer MLP to classify the signal into one of 5 spike classes or noise.
                    </p>
                </div>
            </div>

            <h3 class="project-section-title">Performance at Varying Noise Levels</h3>
            <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 15px;">
                Performance remains strong (Precision 0.97-1.00) at high SNRs but degrades at 0dB as noise amplitudes exceed feature strength.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
                <div>
                    <span style="color: var(--glow-color); font-size: 0.8rem; font-weight: bold;">D1 (80dB) - Test Set</span>
                    <img src="./images/D1_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D1 Classification Graph">
                </div>
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: bold;">D2 (60dB) - Validation</span>
                    <img src="./images/D2_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D2 Classification Graph">
                </div>
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: bold;">D3 (40dB) - Validation</span>
                    <img src="./images/D3_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D3 Classification Graph">
                </div>
                <div>
                    <span style="color: var(--text-muted); font-size: 0.8rem; font-weight: bold;">D4 (20dB) - Validation</span>
                    <img src="./images/D4_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D4 Classification Graph">
                </div>
                <div>
                    <span style="color: #ff5555; font-size: 0.8rem; font-weight: bold;">D5 (0dB) - Validation</span>
                    <img src="./images/D5_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D5 Classification Graph">
                </div>
                <div>
                    <span style="color: #ff5555; font-size: 0.8rem; font-weight: bold;">D6 (<0dB) - Validation</span>
                    <img src="./images/D6_Detected_Peaks_Plot.png" class="project-full-img" style="margin-bottom: 0; height: 150px;" alt="D6 Classification Graph">
                </div>
            </div>

            <h3 class="project-section-title">Engineering Challenges & Solutions</h3>
            <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                <li><strong>Data Augmentation:</strong> Generated synthetic noisy datasets by superimposing real background noise (from D6) onto clean spikes (D1) to match SNR levels.</li>
                <li><strong>Hard Negative Mining:</strong> Trained the model on "offset windows" (5–50 samples from peak) to force the network to distinguish true peaks from edge artifacts.</li>
            </ul>
        `
    };

    // Links for the footer buttons
    const projectLinks = {
        // FIXED: Key must match "LM Health Knee Brace"
        "LM Health Knee Brace": {
            github: "https://github.com/Ac3CJ/medical_lego_module_control",
            report: "https://drive.google.com/file/d/18t0PpNwJsv1cveEKvQrYPH3RShImtgQ5/view?usp=drive_link"
        },
        "Neuron Spike Detector": {
            github: "https://github.com/Ac3CJ/Neuron-Spike-Classifier"
        }
    };

    // --- Modal Logic ---
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body-content");
    const modalFooter = document.getElementById("modal-footer-content");

    function openModal(data) {
        if(!data) return;

        // 1. Set Title
        modalTitle.textContent = data.id;

        // 2. Set Content
        if (richProjectData[data.id]) {
            // A. Use Custom Rich HTML if available
            modalBody.innerHTML = richProjectData[data.id];
        } else {
            // B. Fallback for other nodes (Default text + Tags)
            modalBody.innerHTML = `
                <p style="font-size: 1.1rem; line-height: 1.6; color: #ccc;">${data.info || "No description available."}</p>
                <div class="modal-tags" id="fallback-tags" style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;"></div>
            `;
            
            // Add tags dynamically for fallback
            const related = graphData.links
                .filter(l => l.source.id === data.id || l.target.id === data.id)
                .map(l => l.source.id === data.id ? l.target.id : l.source.id);
            
            const tagContainer = document.getElementById("fallback-tags");
            if(tagContainer) {
                related.forEach(tag => {
                    const span = document.createElement("span");
                    span.classList.add("tech-badge");
                    span.textContent = tag;
                    tagContainer.appendChild(span);
                });
            }
        }

        // 3. Set Footer Buttons (Conditional Rendering)
        const links = projectLinks[data.id];
        
        // Clear previous content
        modalFooter.innerHTML = '';
        
        if (links) {
            let buttonsHtml = '';

            // Check if a Report link exists and is not just a placeholder "#"
            if (links.report && links.report !== "#") {
                buttonsHtml += `
                    <a href="${links.report}" target="_blank" class="modal-btn btn-report">
                        <i class="fa-solid fa-file-pdf"></i> View Report
                    </a>
                `;
            }

            // Check if a GitHub link exists
            if (links.github && links.github !== "#") {
                buttonsHtml += `
                    <a href="${links.github}" target="_blank" class="modal-btn btn-github">
                        <i class="fa-brands fa-github"></i> View Code
                    </a>
                `;
            }

            // Render buttons if any exist, otherwise hide footer
            if (buttonsHtml) {
                modalFooter.innerHTML = buttonsHtml;
                modalFooter.style.display = "flex";
            } else {
                modalFooter.style.display = "none";
            }
        } else {
            modalFooter.style.display = "none";
        }

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
            // We need to find the node object that matches this card's ID
            // NOTE: Ensure your HTML data-id matches the graph node ID exactly, 
            // or use a lookup map like we did previously.
            // For now, let's assume the data-id="Smart Knee Brace" in HTML
            const data = graphData.nodes.find(n => n.id === id) || 
                         // Fallback map if IDs don't match perfectly
                         (id === "smart-knee" ? graphData.nodes.find(n => n.id === "Smart Knee Brace") : null);
            
            if (data) openModal(data);
        });
    });

    // C. Close Modal Interactions
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});