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

    const skillNodes = [
        {id: "Python", group: "skill"},
        {id: "C/C++", group: "skill"},
        {id: "SystemVerilog", group: "skill"},
        // {id: "Dart", group: "skill"},
        {id: "Assembly Language", group: "skill"},
        
        // Domain Specific
        {id: "ROS", group: "skill"},
        {id: "Embedded Systems", group: "skill"},
        {id: "Machine Learning", group: "skill"},
        {id: "Control Theory", group: "skill"},
        {id: "Signal Processing", group: "skill"},
        {id: "FPGA", group: "skill"},
        {id: "Hardware Design", group: "skill"},
        
        // Technologies/Tools
        {id: "Flutter/Dart", group: "skill"},
        {id: "Bluetooth LE", group: "skill"},
        {id: "STM32", group: "skill"},
        {id: "Arduino", group: "skill"},
        {id: "Linux", group: "skill"},

        // Misc.
        {id: "Technical Writing", group: "skill"},
        {id: "Business Analysis", group: "skill"},
        {id: "Market Research", group: "skill"},
        {id: "Robotics Design", group: "skill"},
        {id: "System Integration", group: "skill"},
        {id: "Optimisation", group: "skill"},
        {id: "Biomimetics", group: "skill"}
    ]

    const masterProjects = [
        {
            id: "LM Health Knee Brace",
            subtitle: "Integration & Control Systems",
            icon: "fa-solid fa-microchip",
            tags: ["Flutter/Dart", "C/C++", "Bluetooth LE", "Embedded Systems", "Arduino", "Linux", "System Integration", "Market Research", "Python", "Technical Writing",
                "Business Analysis"
            ], 
            links: {
                github: "https://github.com/Ac3CJ/medical_lego_module_control",
                report: "https://drive.google.com/file/d/18t0PpNwJsv1cveEKvQrYPH3RShImtgQ5/view?usp=drive_link"
            },
            richContent: `
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
            `
        },
        {
            id: "Neuron Spike Detector",
            subtitle: "Neural Networks & CNN",
            icon: "fa-solid fa-brain",
            tags: ["Python", "Machine Learning", "Signal Processing", "Optimisation"],
            links: {
                github: "https://github.com/Ac3CJ/Neuron-Spike-Classifier",
                report: null
            },
            richContent: `
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
        },
        {
            id: "CoppeliaSim Robot Simulation",
            subtitle: "ROS & Obstacle Avoidance",
            icon: "fa-solid fa-vr-cardboard",
            tags: ["Python", "ROS", "Machine Learning", "Linux"],
            links: {
                github: "https://github.com/Ac3CJ/ros-coppeliasim-robot-cw",
                report: "https://drive.google.com/file/d/1uEhiBZxMzIcx5-P6cUhvjCAX-VJPBq-M/view?usp=drive_link"
            },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">Python</span>
                    <span class="tech-badge">ROS / ROS 2</span>
                    <span class="tech-badge">CoppeliaSim</span>
                    <span class="tech-badge">Computer Vision (CNN)</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    Designed and simulated a differential drive mobile robot in <strong>CoppeliaSim</strong> controlled via a custom <strong>ROS</strong> architecture. 
                    The system features a hybrid obstacle avoidance algorithm using LIDAR and proximity sensors, and a deep-learning-based controller that navigates using visual cues.
                </p>

                <h3 class="project-section-title">Task 1: Reactive Obstacle Avoidance</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 15px;">
                    <strong>Objective:</strong> Navigate a walled maze autonomously without collisions.
                </p>
                
                <div class="project-banner-placeholder" style="height: auto; border: none; background: transparent;">
                    <video controls style="width: 100%; border-radius: 8px; border: 1px solid #333;">
                        <source src="./videos/obstacle-demo.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div class="feature-grid" style="margin-top: 20px;">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-bullseye" style="color:#64ffda; margin-right:8px;"></i> LIDAR Navigation</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Processed <code>/scan</code> data to detect the furthest open path. 
                            Implemented dynamic thresholding to ignore backward-facing paths, forcing forward progression.
                        </p>
                    </div>
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-road" style="color:#2196F3; margin-right:8px;"></i> Proximity Safety</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Integrated 8 proximity sensors to detect immediate wall collisions. 
                            Used proportional control to actively steer away from walls when the LIDAR path was too close.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">Task 2: CNN Visual Control</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 15px;">
                    <strong>Objective:</strong> Control robot movement by classifying arrow directions (Up, Down, Left, Right) from a camera feed.
                </p>

                <div class="project-banner-placeholder" style="height: auto; border: none; background: transparent;">
                    <video controls style="width: 100%; border-radius: 8px; border: 1px solid #333;">
                        <source src="./videos/arrow-demo.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>

                <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8; margin-top: 15px;">
                    <li><strong>Model Architecture:</strong> Custom CNN with 2 Convolutional/Pooling layers and a Fully Connected output layer. Utilized <strong>Dropout</strong> to prevent overfitting.</li>
                    <li><strong>Performance:</strong> Achieved <strong>>97% accuracy</strong> on the validation set of ~4000 arrow images.</li>
                    <li><strong>Integration:</strong> The model runs in a ROS node, processing images in real-time and publishing <code>/cmd_vel</code> commands to drive the robot.</li>
                </ul>
            `
        },
        {
            id: "Nucleo Fan Controller",
            subtitle: "Embedded Systems (STM32)",
            icon: "fa-solid fa-fan",
            tags: ["C/C++", "STM32", "Embedded Systems", "Control Theory", "Hardware Design"],
            links: {
                github: "https://github.com/Ac3CJ/Nucleo-Fan-Controller",
                report: null
            },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">C / C++</span>
                    <span class="tech-badge">STM32</span>
                    <span class="tech-badge">PID Control</span>
                    <span class="tech-badge">I2C / PWM</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    Developed a robust embedded fan controller on an <strong>STM32 Nucleo-64</strong> board. 
                    The system features real-time <strong>Closed-Loop PID Control</strong> for both Fan Speed (RPM) and Temperature, allowing precise regulation based on sensor feedback.
                </p>

                <img src="./images/fan-controller.jpg" class="project-full-img" alt="Fan Controller Setup">

                <h3 class="project-section-title">Control Modes</h3>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-gauge-high" style="color:#64ffda; margin-right:8px;"></i> Open Loop</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Direct control of the fan's PWM Duty Cycle (0-100%) using the rotary encoder. 
                            Useful for manual testing and characterizing the fan's max speed.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-rotate" style="color:#2196F3; margin-right:8px;"></i> Closed Loop RPM</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Maintains a specific target RPM (60-2600 RPM) regardless of load changes. 
                            Utilizes a <strong>PID algorithm</strong> (ComputeFanPID) to dynamically adjust PWM based on tachometer feedback.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-temperature-half" style="color:#FFD700; margin-right:8px;"></i> Thermal Control</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Adjusts fan speed to maintain a target temperature. 
                            Reads external temperature sensors via I2C and uses a secondary PID loop (ComputeTempPID) to stabilize the system.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">System Architecture</h3>
                <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                    <li><strong>Interrupt-Driven Inputs:</strong> Tachometer readings and User Inputs (Button/Encoder) are handled via Interrupt Service Routines (ISRs) for microsecond-level precision.</li>
                    <li><strong>State Machine Design:</strong> Implemented a robust state machine to handle mode switching and OLED screen updates without blocking the main control loop.</li>
                </ul>
            `
        },
        {
            id: "FPGA RISC CPU",
            subtitle: "SystemVerilog & Hardware Design",
            icon: "fa-solid fa-gamepad",
            tags: ["SystemVerilog", "FPGA", "Hardware Design", "Embedded Systems", "System Integration"],
            links: { github: "https://github.com/Ac3CJ/FPGA-CPU-And-Pong-Game", report: null },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">SystemVerilog</span>
                    <span class="tech-badge">Quartus Prime</span>
                    <span class="tech-badge">Assembly Language</span>
                    <span class="tech-badge">Digital Logic Design</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    Designed and implemented a custom <strong>HighRISC Microprocessor</strong> on a <strong>5CSEMA5F31C6 FPGA</strong> board. 
                    The project involved building the CPU from scratch using SystemVerilog, defining a custom <strong>Instruction Set Architecture (ISA)</strong>, and writing Assembly drivers to render a playable Pong game via VGA.
                </p>

                <img src="./images/cpu-architecture.png" class="project-full-img" alt="HighRISC CPU Architecture">

                <h3 class="project-section-title">Processor Architecture</h3>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-diagram-project" style="color:#64ffda; margin-right:8px;"></i> Custom ISA</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Defined a specific opcode set including <code>LOAD</code>, <code>STORE</code>, and <code>JUMP</code> instructions. 
                            The Control Unit manages the Fetch-Decode-Execute cycle, coordinating data flow between the ALU, Registers, and RAM.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-memory" style="color:#2196F3; margin-right:8px;"></i> Memory & I/O</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Implemented a von Neumann architecture where program code and video memory share the address space. 
                            This allows the CPU to write directly to VGA buffers to update game state pixels in real-time.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">Pong Game Implementation</h3>
                <p style="color: #ccc; line-height: 1.6;">
                    The final validation involved writing a complete game in Assembly to demonstrate the CPU's capabilities.
                </p>

                <img src="./images/pong-game.jpg" class="project-full-img" style="margin-top: 20px;" alt="FPGA Pong Game Demo">

                <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                    <li><strong>VGA Driver:</strong> Created a hardware module to generate strict H-Sync and V-Sync timing signals for 640x480 resolution.</li>
                    <li><strong>Game Logic:</strong> Handled collision detection and paddle movement by reading the FPGA's physical buttons and updating the frame buffer on every clock cycle.</li>
                </ul>
            `
        },
        {
            id: "Genetic Algorithm Analysis",
            subtitle: "Optimization & Schema Theorem",
            icon: "fa-solid fa-dna",
            tags: ["Python", "Optimization", "Technical Writing"],
            links: {
                github: null, 
                report: "https://drive.google.com/file/d/1mDeMOMkM67sBqn7Kyqi_ZcT4a4vYf2ZE/view?usp=drive_link"
            },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">Python</span>
                    <span class="tech-badge">Matplotlib</span>
                    <span class="tech-badge">Optimization</span>
                    <span class="tech-badge">Evolutionary Computation</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    An in-depth analysis of <strong>Genetic Algorithms (GA)</strong> applied to numerical optimization problems. 
                    The study investigates the impact of hyperparameters on convergence speed and validates the <strong>Schema Theorem</strong> 
                    by tracking the propagation of "building blocks" through generations.
                </p>

                <h3 class="project-section-title">Numerical Optimization For Sums of Sets with N Numbers</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 15px;">
                    <strong>Objective:</strong> Optimise a set of N numbers to sum to a specific target value (550).
                </p>

                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-sliders" style="color:#64ffda; margin-right:8px;"></i> Hyperparameters</h4>
                        <ul style="font-size: 0.85rem; color: #a0a0a0; padding-left: 20px; line-height: 1.6;">
                            <li><strong>Population:</strong> 400 individuals</li>
                            <li><strong>Mutation Rate:</strong> 0.01 (1%)</li>
                            <li><strong>Retain Rate:</strong> 0.20 (Elitism)</li>
                            <li><strong>Crossover:</strong> Single-point (1.00 rate)</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-chart-line" style="color:#2196F3; margin-right:8px;"></i> Performance</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            The optimized GA achieved convergence in just <strong>20 generations</strong> (0.01 seconds). 
                            Ranking selection was used to prioritize higher fitness individuals while maintaining diversity.
                        </p>
                    </div>
                </div>

                <img src="./images/ga-convergence.png" class="project-full-img">

                <h3 class="project-section-title">Holland Schema Theorem</h3>
                <p style="color: #ccc; line-height: 1.6;">
                    This section validates the <strong>Building Block Hypothesis</strong>, which states that short, low-order schemata with above-average fitness increase exponentially in frequency.
                </p>

                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-check" style="color:#FFD700; margin-right:8px;"></i> Good Schema</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            <strong>Definition:</strong> <code>Coeff[0] == 25</code><br>
                            Observed an exponential increase in instances, aligning closely with the theoretical estimate, proving the selection pressure favours beneficial traits.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-xmark" style="color:#ff5555; margin-right:8px;"></i> Bad Schema</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            <strong>Definition:</strong> <code>Coeff[1] == 10</code><br>
                            Instances rapidly decayed to near zero. The "disruption" caused by crossover and mutation effectively filtered out these lower-fitness genes over time.
                        </p>
                    </div>
                </div>

                <img src="./images/holland-schema.png" class="project-full-img">

                <h3 class="project-section-title">Conclusion</h3>
                <p style="color: #a0a0a0; line-height: 1.6;">
                    The study confirmed that while mutation introduces necessary diversity to prevent local optima, <strong>Selection Pressure</strong> is the primary driver of convergence. 
                    The results successfully demonstrated the Schema Theorem mechanics, with "Good" schemata dominating the population as generations progressed.
                </p>
            `
        },
        {
            id: "PIC16F84A Embedded Projects",
            subtitle: "Assembly & C Embedded Systems",
            icon: "fa-solid fa-calculator",
            tags: ["C/C++", "Embedded Systems", "Hardware Design", "Assembly Language", "Optimisation"],
            links: { github: null, report: null },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">MPLAB X</span>
                    <span class="tech-badge">Assembly (ASM)</span>
                    <span class="tech-badge">Embedded C</span>
                    <span class="tech-badge">PIC16F84A</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    A series of hardware integration projects using the <strong>PIC16F84A Microcontroller</strong>. 
                    The projects explore low-level resource management, shifting from raw <strong>Assembly Language</strong> for timing-critical applications to <strong>C</strong> for complex peripheral handling.
                </p>

                <h3 class="project-section-title">1. Digital Stopwatch</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Language:</strong> Assembly
                </p>
                <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
                    Engineered a precision stopwatch using <strong>Timer0 interrupts</strong> to maintain accurate timekeeping independent of the main execution loop. 
                    Utilized multiplexing to drive the 7-segment displays efficiently. Stopwatch Multiplexing Demo (10x Slow Motion) shown below:
                </p>
                
                <div class="project-banner-placeholder" style="height: auto; border: none; background: transparent;">
                    <video controls style="width: 100%; border-radius: 8px; border: 1px solid #333;">
                        <source src="./videos/stopwatch-demo.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>

                <h3 class="project-section-title">2. Digital Combination Lock</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Language:</strong> Assembly
                </p>
                <p style="color: #ccc; line-height: 1.6; margin-bottom: 15px;">
                    Implemented a secure logic system that accepts a specific 4-digit input from a keypad. 
                    Features include input debouncing and a state machine to handle "Locked", "Unlocked", and "Error" states.
                </p>
                
                <img src="./images/pic-lock.png" class="project-full-img" alt="Digital Lock Circuit">

                <h3 class="project-section-title">3. Digital Voltmeter</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Language:</strong> C
                </p>
                <p style="color: #ccc; line-height: 1.6; margin-bottom: 15px;">
                    Developed a voltage measurement tool interacting with an <strong>MCP3001 ADC</strong>. 
                    Unlike previous projects, this was written in <strong>C</strong> to handle the complex <strong>SPI communication</strong> and bit manipulation required to decode the 10-bit ADC data.
                </p>
                
                <img src="./images/pic-voltmeter.png" class="project-full-img" alt="Voltmeter SPI Setup">
            `
        },
        {
            id: "Healthtech Company Analysis",
            subtitle: "Sensoria Health Case Study",
            icon: "fa-solid fa-user-doctor",
            tags: ["Business Analysis", "Technical Writing", "Market Research"],
            links: {
                github: null,
                report: "https://drive.google.com/file/d/1vZNCGLDPQ4ulWxkBNVn9v0YebZ-gMuJY/view?usp=drive_link"
            },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">Business Analysis</span>
                    <span class="tech-badge">Market Strategy</span>
                    <span class="tech-badge">SEO & Digital Marketing</span>
                    <span class="tech-badge">Wearable Tech (IoMe)</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    A comprehensive business case study of <strong>Sensoria Health</strong>, a pioneer in the "Internet of Me" (IoMe) sector. 
                    The report analyses their strategic pivot from general fitness to <strong>clinical-grade medical wearables</strong>, focusing on their smart garment technology and remote patient monitoring ecosystems.
                </p>

                <h3 class="project-section-title">Strategic Analysis</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 15px;">
                    <strong>Core Identity:</strong> "The Garment is the Computer". Moving beyond wristbands to textile-embedded sensors.
                </p>

                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-shirt" style="color:#64ffda; margin-right:8px;"></i> Smart Textiles</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Analysis of Sensoria's proprietary textile sensors which allow for comfortable, 24/7 monitoring of gait and rehabilitation metrics, overcoming the limitations of rigid hardware.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-hospital-user" style="color:#2196F3; margin-right:8px;"></i> Clinical Focus</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Evaluated the partnership with <strong>Genesis Healthcare</strong>, allowing Sensoria to leverage clinical patient outreach while providing data-driven rehabilitation tools for clinicians.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">Digital Marketing Strategy</h3>
                <p style="color: #ccc; line-height: 1.6;">
                    An audit of Sensoria's digital presence revealed a need for stronger B2B targeting. The report proposes a "Storytelling" approach to build brand trust in the medical sector.
                </p>

                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-magnifying-glass-chart" style="color:#FFD700; margin-right:8px;"></i> SEO Optimization</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            <strong>Problem:</strong> Low organic traffic for medical keywords.<br>
                            <strong>Solution:</strong> Implementation of long-tail keywords (e.g., "Remote Gait Monitoring") to capture high-intent medical professionals rather than casual fitness users.
                        </p>
                    </div>

                    <div class="feature-card">
                        <h4><i class="fa-solid fa-book-open" style="color:#ff5555; margin-right:8px;"></i> Brand Storytelling</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Proposed a content strategy focusing on <strong>Patient Success Stories</strong>. 
                            Moving away from technical specs to emotional narratives that demonstrate real-world recovery and quality-of-life improvements.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">Key Recommendations</h3>
                <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                    <li><strong>Website Restructuring:</strong> Create dedicated portals for "Clinicians" vs "Patients" to streamline the user journey and improve conversion rates.</li>
                    <li><strong>IoMe Expansion:</strong> Leverage the open ecosystem to integrate with third-party medical footwear, creating a unified data platform for total body monitoring.</li>
                </ul>
            `
        },
        {
            id: "Biomimetic Shoulders Lit. Review",
            subtitle: "Kinematic Architecture Review",
            icon: "fa-solid fa-book-journal-whills",
            tags: ["Technical Writing", "Robotics Design", "Biomimetics"],
            links: { 
                github: null, 
                report: "https://drive.google.com/file/d/1PYB9QhEXeSlolK7IAwJ8r4a5Evnq86Yl/view?usp=drive_link" 
            },
            richContent: `
                <div class="tech-stack-container">
                    <span class="tech-badge">Academic Research</span>
                    <span class="tech-badge">Comparative Analysis</span>
                    <span class="tech-badge">Soft Robotics</span>
                    <span class="tech-badge">Actuator Design</span>
                </div>

                <p style="color: #ccc; line-height: 1.6; font-size: 1.05rem;">
                    A critical review of state-of-the-art <strong>Biomimetic Upper-Limb Architectures</strong>, categorizing systems into "Pseudo-Biomimetic" (Cable-Driven) and "High Bio-Fidelity" (Soft Actuators). 
                    The study evaluates the trade-off between dynamic capacity (speed/payload) and intrinsic compliance for safe Human-Robot Interaction (HRI).
                </p>

                <img src="./images/biomimetic-pwr-graph.png" class="project-full-img" alt="PWR Comparison Graph">

                <h3 class="project-section-title">1. Pseudo-Biomimetic Systems</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Technology:</strong> Cable-Driven Mechanisms
                </p>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-bolt" style="color:#64ffda; margin-right:8px;"></i> High Performance</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            Dominated quantitative metrics, achieving <strong>Payload-to-Weight Ratios (PWR) > 1.80</strong> and speeds exceeding <strong>11 m/s</strong>.
                        </p>
                    </div>
                    <div class="feature-card">
                        <h4><i class="fa-solid fa-triangle-exclamation" style="color:#ff5555; margin-right:8px;"></i> Safety Risks</h4>
                        <p style="font-size: 0.9rem; color: #a0a0a0;">
                            High inertia and stiffness make them dangerous for unstructured collaborative environments.
                        </p>
                    </div>
                </div>

                <h3 class="project-section-title">2. High Bio-Fidelity Designs</h3>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-bottom: 10px;">
                    <strong>Technology:</strong> Pneumatic Artificial Muscles (PAMs) & Smart Materials
                </p>
                <ul style="color: #a0a0a0; padding-left: 20px; line-height: 1.8;">
                    <li><strong>Intrinsic Safety:</strong> PAMs offer excellent compliance but suffer from non-linear control challenges and lower precision.</li>
                    <li><strong>Smart Materials:</strong> Emerging solutions like <strong>HASEL actuators</strong> offer silent, self-sensing operation but are currently limited by minute payload capacities (<50g).</li>
                </ul>

                <h3 class="project-section-title">Conclusion</h3>
                <p style="color: #ccc; line-height: 1.6;">
                    The review identified <strong>Hybrid Variable Stiffness Actuators (VSAs)</strong> as the most promising solution. 
                    By combining motor-driven power with compliant elastic elements, VSAs bridge the gap between industrial performance and biological safety.
                </p>
            `
        },
        {
            id: "Non-Invasive Prosthetic Control",
            subtitle: "EEG/EMG Control & Signal Processing",
            icon: "fa-solid fa-robot",
            tags: ["Control Theory", "Signal Processing", "Machine Learning", "Python"],
            links: { github: null, report: null },
            richContent: `<p style="color:#ccc;">FYP Details coming soon...</p>`
        }
    ];

    const graphNodes = [
        ...masterProjects.map(p => ({id: p.id, group: "project"})),
        ...skillNodes
    ];

    const graphLinks = [];
    masterProjects.forEach(project => {
        project.tags.forEach(tag => {
            // Only add link if the tag exists in our skill list (prevents crashes)
            if (skillNodes.find(s => s.id === tag)) {
                graphLinks.push({ source: tag, target: project.id });
            }
        });
    });

    const graphData = { nodes: graphNodes, links: graphLinks };

    const projectListContainer = document.getElementById('project-list');
    if (projectListContainer) {
        projectListContainer.innerHTML = ''; // Clear existing
        masterProjects.forEach(p => {
            // Generate Tags HTML
            const tagsHtml = p.tags.slice(0, 3).map(t => `<span class="tiny-tag">${t}</span>`).join('');
            
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-id', p.id);
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-img-holder"><i class="${p.icon}"></i></div>
                    <div class="card-info">
                        <h3>${p.id}</h3>
                        <p>${p.subtitle}</p>
                    </div>
                </div>
                <div class="card-tags">
                    ${tagsHtml}
                    ${p.tags.length > 3 ? '<span class="tiny-tag">...</span>' : ''}
                </div>
            `;
            projectListContainer.appendChild(card);
        });
    }

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
        .attr("r", d => 5 + (d.connections * 0.5)) // Size based on connections
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
            const radius = 5 + (d.connections * 0.5);
            // Add radius + padding to push text below the circle
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

    // --- Modal Logic ---
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body-content");
    const modalFooter = document.getElementById("modal-footer-content");

    function openModal(data) {
        if(!data) return;

        // Find the project details in masterProjects
        const project = masterProjects.find(p => p.id === data.id);
        
        // 1. Set Title
        modalTitle.textContent = data.id;

        // 2. Set Content
        if (project && project.richContent) {
            modalBody.innerHTML = project.richContent;
        } else {
            // Fallback
            modalBody.innerHTML = `<p style="color:#ccc;">Details coming soon...</p>`;
        }

        // 3. Set Footer Buttons
        modalFooter.innerHTML = '';
        if (project && project.links) {
            let buttonsHtml = '';
            if (project.links.report) {
                buttonsHtml += `<a href="${project.links.report}" target="_blank" class="modal-btn btn-report"><i class="fa-solid fa-file-pdf"></i> View Report</a>`;
            }
            if (project.links.github) {
                buttonsHtml += `<a href="${project.links.github}" target="_blank" class="modal-btn btn-github"><i class="fa-brands fa-github"></i> View Code</a>`;
            }
            
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