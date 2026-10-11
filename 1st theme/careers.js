
document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       ELEMENT REFERENCES
    ========================================= */

    const loader = document.getElementById("load");
    const header = document.querySelector("header.nav");
    const burger = document.querySelector(".burger");
    const menu = document.getElementById("menu");

    const dialog = document.getElementById("domainDialog");
    const closeDomain = document.getElementById("closeDomain");
    const title = document.getElementById("dialogTitle");
    const description = document.getElementById("dialogDescription");
    const focus = document.getElementById("dialogFocus");
    const index = document.getElementById("dialogIndex");

    const applyNow = document.getElementById("applyNow");
    const form = document.getElementById("af");
    const domainSelect = document.getElementById("domain");

    const successDialog = document.getElementById("md");
    const successClose = document.getElementById("mc");

    let activeDomain = "";


    /* =========================================
       INTERNSHIP DOMAIN DESCRIPTIONS
    ========================================= */


    const domains = {
        "Web Development": {
            number: "01",
            description:
                "An entry-level internship for candidates interested in building modern websites and web applications, working across user interfaces, application logic and data integration.",
            overview:
                "Work with the development team to understand project requirements, build responsive interfaces, connect APIs and develop practical web application features.",
            responsibilities: [
                "Build responsive pages using HTML, CSS and JavaScript.",
                "Assist with frontend and backend feature development.",
                "Integrate APIs and work with databases.",
                "Test features, fix bugs and document changes."
            ],
            skills: [
                "Basic HTML, CSS and JavaScript",
                "Understanding of responsive web design",
                "Basic programming and debugging",
                "Familiarity with Git or version control"
            ],
            preferred: [
                "React, Angular or another frontend framework",
                "Python/Django, Node.js or PHP",
                "MySQL, PostgreSQL or MongoDB",
                "Personal projects or a GitHub portfolio"
            ],
            eligibility: [
                "Students, recent graduates or entry-level candidates in a relevant discipline.",
                "Basic programming knowledge and willingness to learn.",
                "Ability to communicate progress and work with a team."
            ],
            learning:
                "Practical experience with web development workflows, API integration, debugging, version control and project collaboration."
        },

        "VLSI Design": {
            number: "02",
            description:
                "An entry-level hardware design internship for candidates interested in digital electronics, semiconductor design and functional verification.",
            overview:
                "Learn the digital design workflow and assist with basic RTL modules, simulation, verification and analysis of hardware behaviour.",
            responsibilities: [
                "Study digital design specifications.",
                "Assist with simple RTL design tasks.",
                "Run simulations and examine waveforms.",
                "Document test results and design observations."
            ],
            skills: [
                "Digital logic fundamentals",
                "Basic combinational and sequential circuits",
                "Analytical and problem-solving skills",
                "Attention to detail"
            ],
            preferred: [
                "Verilog or SystemVerilog fundamentals",
                "Basic testbench concepts",
                "Familiarity with simulation tools",
                "Basic semiconductor or computer architecture knowledge"
            ],
            eligibility: [
                "Students or recent graduates in ECE, EEE or a related discipline.",
                "Interest in digital hardware design.",
                "Willingness to learn hardware design and verification tools."
            ],
            learning:
                "Foundational experience in RTL design, digital simulation, waveform analysis and hardware verification practices."
        },

        "Mobile Applications": {
            number: "03",
            description:
                "A practical internship for candidates interested in developing mobile applications, creating usable interfaces and connecting apps with backend services.",
            overview:
                "Assist in building mobile application screens, implementing app features, integrating APIs and testing application behaviour across devices.",
            responsibilities: [
                "Develop and improve mobile application screens.",
                "Connect application features to backend APIs.",
                "Test layouts and functionality on devices or emulators.",
                "Identify bugs and document fixes."
            ],
            skills: [
                "Basic programming knowledge",
                "Understanding of UI and user experience",
                "Problem-solving and debugging",
                "Interest in mobile application development"
            ],
            preferred: [
                "Flutter or React Native",
                "Java, Kotlin, Swift or Dart basics",
                "REST API and JSON fundamentals",
                "Git and basic application testing"
            ],
            eligibility: [
                "Students or recent graduates in a relevant technical discipline.",
                "Basic programming knowledge.",
                "Interest in building mobile-first products."
            ],
            learning:
                "Experience with mobile app architecture, API integration, device testing and application debugging."
        },

        "Cloud Computing": {
            number: "04",
            description:
                "An entry-level cloud internship for candidates interested in deployment, infrastructure, monitoring and reliable application operations.",
            overview:
                "Explore cloud fundamentals and assist with application deployment, environment configuration, operational monitoring and documentation.",
            responsibilities: [
                "Learn cloud infrastructure fundamentals.",
                "Assist with deploying applications to test environments.",
                "Review logs and basic monitoring information.",
                "Document setup steps and deployment issues."
            ],
            skills: [
                "Basic operating system knowledge",
                "Networking fundamentals",
                "Command-line familiarity",
                "Analytical troubleshooting skills"
            ],
            preferred: [
                "AWS, Microsoft Azure or Google Cloud fundamentals",
                "Linux basics",
                "Docker or container concepts",
                "Basic scripting with Python or Bash"
            ],
            eligibility: [
                "Students or recent graduates in a relevant technical discipline.",
                "Interest in cloud platforms and infrastructure.",
                "Willingness to learn deployment and operations practices."
            ],
            learning:
                "Foundational knowledge of cloud services, deployments, monitoring, logs and infrastructure troubleshooting."
        },

        "Cyber Security": {
            number: "05",
            description:
                "A security-focused internship for candidates interested in application security, secure coding, risk awareness and defensive security practices.",
            overview:
                "Learn how to identify common security weaknesses, review safe configurations and document findings in authorised lab or test environments.",
            responsibilities: [
                "Study common application security risks.",
                "Assist with basic security reviews in authorised environments.",
                "Review authentication and access-control concepts.",
                "Document findings and recommended remediation."
            ],
            skills: [
                "Networking and operating system fundamentals",
                "Basic web technology knowledge",
                "Analytical thinking and attention to detail",
                "Responsible handling of security information"
            ],
            preferred: [
                "OWASP Top 10 fundamentals",
                "Linux command-line basics",
                "Python or scripting fundamentals",
                "Familiarity with security testing labs"
            ],
            eligibility: [
                "Students or recent graduates in a relevant technical discipline.",
                "Interest in defensive security and secure development.",
                "Commitment to testing only systems with explicit authorisation."
            ],
            learning:
                "Practical understanding of secure coding, vulnerability reporting, access control and responsible security assessment."
        },

        "IT Consulting": {
            number: "06",
            description:
                "An internship for candidates who enjoy analysing business problems, evaluating technology options and helping teams plan practical solutions.",
            overview:
                "Assist in understanding client or stakeholder needs, researching technical options, preparing documentation and organising solution requirements.",
            responsibilities: [
                "Collect and organise project requirements.",
                "Research technologies and possible solutions.",
                "Prepare presentations and technical documentation.",
                "Track actions, risks and project updates."
            ],
            skills: [
                "Clear written and verbal communication",
                "Logical thinking and problem-solving",
                "Research and documentation skills",
                "Basic understanding of software projects"
            ],
            preferred: [
                "Excel, PowerPoint or similar productivity tools",
                "Basic project management concepts",
                "Process mapping or flowcharting",
                "Awareness of software development lifecycles"
            ],
            eligibility: [
                "Students or recent graduates in IT, engineering, business or a related field.",
                "Interest in technology and business problem-solving.",
                "Ability to organise information clearly."
            ],
            learning:
                "Experience with requirements analysis, technology evaluation, stakeholder communication and structured documentation."
        },

        "Data Engineering": {
            number: "07",
            description:
                "An entry-level data internship for candidates interested in preparing reliable datasets and understanding how data moves from source systems to analytics.",
            overview:
                "Assist with data collection, cleaning, validation and transformation while learning the fundamentals of data pipelines and database design.",
            responsibilities: [
                "Clean and validate datasets.",
                "Write basic SQL queries for data retrieval.",
                "Assist with simple data transformation tasks.",
                "Document data sources and pipeline steps."
            ],
            skills: [
                "Basic SQL and database concepts",
                "Analytical and numerical reasoning",
                "Attention to data quality",
                "Basic programming or scripting knowledge"
            ],
            preferred: [
                "Python and Pandas",
                "ETL and data pipeline concepts",
                "Relational database design",
                "Exposure to a cloud data platform"
            ],
            eligibility: [
                "Students or recent graduates in a relevant technical or quantitative discipline.",
                "Basic SQL or programming knowledge.",
                "Interest in data processing and analytics systems."
            ],
            learning:
                "Foundational experience with SQL, data quality, transformations, database concepts and data pipeline documentation."
        },

        "Business Analysis": {
            number: "08",
            description:
                "An internship for candidates who enjoy understanding user needs and converting business problems into clear requirements for technology teams.",
            overview:
                "Assist in documenting business requirements, mapping processes, preparing user stories and supporting requirement reviews and testing.",
            responsibilities: [
                "Gather and organise business requirements.",
                "Draft user stories and acceptance criteria.",
                "Prepare process flows and project documentation.",
                "Support requirement reviews and user acceptance testing."
            ],
            skills: [
                "Communication and active listening",
                "Logical and structured thinking",
                "Documentation and organisation",
                "Basic understanding of software projects"
            ],
            preferred: [
                "Excel, Word or similar productivity tools",
                "Flowcharts and process mapping",
                "Agile and Scrum fundamentals",
                "Jira or similar task-tracking tools"
            ],
            eligibility: [
                "Students or recent graduates in IT, engineering, business or a related field.",
                "Interest in business processes and technology.",
                "Ability to explain information clearly."
            ],
            learning:
                "Experience with requirement gathering, user stories, process documentation, stakeholder communication and acceptance testing."
        },

        "Edge Computing / IoT": {
            number: "09",
            description:
                "An internship for candidates interested in connected devices, sensor data, local processing and communication between devices and cloud platforms.",
            overview:
                "Explore how IoT devices collect data and communicate with software platforms, assisting with basic prototypes, data flows and integration tests.",
            responsibilities: [
                "Study basic IoT architecture and device workflows.",
                "Assist with sensor data collection or simulation.",
                "Explore device-to-platform communication.",
                "Test data flows and document results."
            ],
            skills: [
                "Basic programming fundamentals",
                "Understanding of networking concepts",
                "Logical troubleshooting and problem-solving",
                "Interest in connected systems"
            ],
            preferred: [
                "Python or C/C++ basics",
                "Arduino, ESP32 or similar platforms",
                "MQTT, HTTP or REST concepts",
                "Basic electronics and sensor knowledge"
            ],
            eligibility: [
                "Students or recent graduates in a relevant technical discipline.",
                "Interest in IoT, embedded systems or connected devices.",
                "Willingness to learn device integration and testing."
            ],
            learning:
                "Foundational experience with IoT architecture, device data, communication protocols and edge-to-cloud integration."
        }
    };



    /* =========================================
       PAGE LOADER
    ========================================= */

    window.setTimeout(() => {
        loader?.classList.add("x");
    }, 900);

    window.addEventListener("load", () => {
        loader?.classList.add("x");
    }, { once: true });


    /* =========================================
       STICKY NAVBAR
    ========================================= */

    const updateHeader = () => {
        header?.classList.toggle("s", window.scrollY > 20);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (burger && menu) {
        burger.addEventListener("click", () => {
            const isOpen =
                burger.getAttribute("aria-expanded") !== "true";

            burger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menu.classList.toggle("open", isOpen);
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("open");

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                menu.classList.remove("open");

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }


    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */

    const revealItems =
        document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -25px 0px"
            }
        );

        revealItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        revealItems.forEach(item => {
            item.classList.add("is-visible");
        });
    }



    /* =========================================
       OPEN INTERNSHIP DESCRIPTION POPUP
    ========================================= */

    const jobOverview = document.getElementById("jobOverview");
    const jobResponsibilities = document.getElementById("jobResponsibilities");
    const jobSkills = document.getElementById("jobSkills");
    const jobPreferred = document.getElementById("jobPreferred");
    const jobEligibility = document.getElementById("jobEligibility");
    const jobLearning = document.getElementById("jobLearning");

    function populateList(element, items = []) {
        if (!element) return;

        element.replaceChildren();

        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            element.appendChild(li);
        });
    }

    document.querySelectorAll("[data-domain]").forEach(button => {
        button.addEventListener("click", () => {
            activeDomain = button.dataset.domain || "";

            const data = domains[activeDomain];

            if (!data || !dialog) return;

            if (title) title.textContent = activeDomain;

            if (description) {
                description.textContent = data.description || "";
            }

            if (index) {
                index.textContent =
                    `INTERNSHIP ${data.number} / JOB DESCRIPTION`;
            }

            if (jobOverview) {
                jobOverview.textContent = data.overview || "";
            }

            populateList(jobResponsibilities, data.responsibilities);
            populateList(jobSkills, data.skills);
            populateList(jobPreferred, data.preferred);
            populateList(jobEligibility, data.eligibility);

            if (jobLearning) {
                jobLearning.textContent = data.learning || "";
            }

            // Hide the form when opening a different domain.
            form?.classList.remove("is-open");

            // Restore the Apply button.
            if (applyNow) {
                applyNow.innerHTML =
                    'Apply for this internship <span aria-hidden="true">→</span>';
            }

            // Automatically select the domain in the form.
            if (domainSelect) {
                domainSelect.value = activeDomain;
            }

            if (!dialog.open) {
                dialog.showModal();
            }
        });
    });



    /* =========================================
       CLOSE DOMAIN DESCRIPTION POPUP
    ========================================= */

    closeDomain?.addEventListener("click", () => {
        dialog?.close();
    });

    // Close when clicking the backdrop.
    dialog?.addEventListener("click", event => {
        if (event.target === dialog) {
            dialog.close();
        }
    });


    /* =========================================
       APPLY BUTTON
       REVEAL APPLICATION FORM
    ========================================= */

    applyNow?.addEventListener("click", () => {
        if (!form) {
            return;
        }

        // Reveal the form inside the domain popup.
        form.classList.add("is-open");

        // Keep the selected domain prefilled.
        if (domainSelect) {
            domainSelect.value = activeDomain;
        }

        applyNow.textContent = "Application form opened";

        // Scroll to the application form.
        window.setTimeout(() => {
            form.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        }, 80);
    });


    /* =========================================
       FORM ERROR HANDLING
    ========================================= */

    const showError = (input, message) => {
        const field = input.closest(".field");

        if (!field) {
            return;
        }

        field.classList.add("bad");

        const error = field.querySelector(".err");

        if (error) {
            error.textContent = message;
        }

        input.setAttribute("aria-invalid", "true");
    };


    const clearError = input => {
        const field = input.closest(".field");

        field?.classList.remove("bad");

        const error = field?.querySelector(".err");

        if (error) {
            error.textContent = "";
        }

        input.removeAttribute("aria-invalid");
    };


    /* =========================================
       VALIDATE INDIVIDUAL FORM FIELD
    ========================================= */

    const validateField = input => {
        clearError(input);

        const rules = (input.dataset.v || "")
            .split(/\s+/)
            .filter(Boolean);

        const value = input.type === "file"
            ? (input.files?.[0]?.name || "")
            : input.value.trim();

        for (const rule of rules) {

            // Required field.
            if (rule === "req" && !value) {
                showError(input, "This field is required.");
                return false;
            }

            // Email validation.
            if (
                rule === "email" &&
                value &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
                showError(
                    input,
                    "Enter a valid email address."
                );

                return false;
            }

            // Phone number validation.
            if (
                rule === "phone" &&
                value &&
                !/^[+()\d\s.-]{7,20}$/.test(value)
            ) {
                showError(
                    input,
                    "Enter a valid phone number."
                );

                return false;
            }

            // Minimum character length.
            if (rule.startsWith("min:")) {
                const minimum = Number(rule.split(":")[1]);

                if (value.length < minimum) {
                    showError(
                        input,
                        `Enter at least ${minimum} characters.`
                    );

                    return false;
                }
            }

            // Maximum character length.
            if (rule.startsWith("max:")) {
                const maximum = Number(rule.split(":")[1]);

                if (value.length > maximum) {
                    showError(
                        input,
                        `Use no more than ${maximum} characters.`
                    );

                    return false;
                }
            }

            // URL validation.
            if (rule === "url" && value) {
                try {
                    const url = new URL(value);

                    if (
                        !["http:", "https:"].includes(url.protocol)
                    ) {
                        throw new Error("Invalid URL protocol");
                    }
                } catch {
                    showError(
                        input,
                        "Enter a valid URL beginning with https://."
                    );

                    return false;
                }
            }
        }


        /* =====================================
           RESUME FILE VALIDATION
        ===================================== */

        if (input.type === "file" && input.files?.[0]) {
            const file = input.files[0];

            // Allowed file formats.
            if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
                showError(
                    input,
                    "Upload a PDF, DOC or DOCX file."
                );

                return false;
            }

            // Maximum file size: 2 MB.
            if (file.size > 2 * 1024 * 1024) {
                showError(
                    input,
                    "The resume must be 2 MB or smaller."
                );

                return false;
            }
        }

        return true;
    };


    /* =========================================
       LIVE VALIDATION AND FORM SUBMISSION
    ========================================= */

    if (form) {
        const fields = form.querySelectorAll(
            "input, select, textarea"
        );

        fields.forEach(input => {
            input.addEventListener("blur", () => {
                validateField(input);
            });

            input.addEventListener("change", () => {
                validateField(input);
            });

            input.addEventListener("input", () => {
                if (
                    input.closest(".field")?.classList
                        .contains("bad")
                ) {
                    validateField(input);
                }
            });
        });


        /* =====================================
           SUBMIT APPLICATION FORM
        ===================================== */



        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzU6jSYHfVG6n9HA1Iyca8syhOB7d3v4SdCxc9ZuAvMtnz2W5iJsZnJmroJtpQbjtx9/exec";

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const allFields = [
                ...form.querySelectorAll("input, select, textarea")
            ];

            const results = allFields.map(validateField);

            if (!results.every(Boolean)) {
                form.querySelector('[aria-invalid="true"]')?.focus();
                return;
            }

            const submitButton = document.getElementById("submitApplication");
            const originalText = submitButton.innerHTML;

            try {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";

                const getValue = (name) =>
                    form.querySelector(`[name="${name}"]`)?.value.trim() || "";

                const file = form.querySelector('[name="resume"]')?.files?.[0];

                if (!file) {
                    throw new Error("Please select your resume.");
                }

                const resume = await new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        resolve({
                            name: file.name,
                            mimeType: file.type || "application/octet-stream",
                            base64: reader.result.split(",")[1]
                        });
                    };

                    reader.onerror = () =>
                        reject(new Error("Unable to read the resume."));

                    reader.readAsDataURL(file);
                });

                const application = {
                    name: getValue("name"),
                    email: getValue("email"),
                    phone: getValue("phone"),
                    college: getValue("college"),
                    degree: getValue("degree"),
                    year: getValue("year"),
                    domain: getValue("domain"),
                    skills: getValue("tech"),
                    experience: getValue("exp"),
                    portfolio: getValue("portfolio"),
                    linkedin: getValue("linkedin"),
                    interest: getValue("msg"),
                    resume
                };

                await fetch(SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(application)
                });

                const successDialog = document.getElementById("md");

                if (successDialog) {
                    successDialog.showModal();
                }

            } catch (error) {
                console.error("Application submission error:", error);
                alert(error.message || "Unable to submit the application.");
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });


    }


    /* =========================================
       SUCCESS POPUP CLOSE BUTTON
    ========================================= */

    successClose?.addEventListener("click", () => {
        successDialog?.close();
    });


    /* =========================================
       CLOSE SUCCESS POPUP ON BACKDROP CLICK
    ========================================= */

    successDialog?.addEventListener("click", event => {
        if (event.target === successDialog) {
            successDialog.close();
        }
    });


    /* =========================================
       RESET FORM AFTER SUCCESS POPUP CLOSES
    ========================================= */

    successDialog?.addEventListener("close", () => {
        form?.reset();

        // Hide the form again.
        form?.classList.remove("is-open");

        // Remove validation errors.
        form?.querySelectorAll(".field.bad").forEach(field => {
            field.classList.remove("bad");
        });

        form?.querySelectorAll("[aria-invalid]").forEach(field => {
            field.removeAttribute("aria-invalid");
        });

        form?.querySelectorAll(".err").forEach(error => {
            error.textContent = "";
        });

        // Restore the Apply button.
        if (applyNow) {
            applyNow.innerHTML =
                'Apply for this domain <span aria-hidden="true">→</span>';
        }
    });

});