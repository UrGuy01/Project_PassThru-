Secure AI-driven Password Strength Analyzer
Overview
The Secure AI-driven Password Strength Analyzer is an advanced system designed to evaluate password security, providing real-time feedback and actionable insights. It leverages machine learning, vector embeddings, cryptographic hashing, and security simulations to assess password strength against common weak passwords and real-world hacking techniques.

The system features:
✅ A chatbot-driven interface for interactive password guidance
✅ A gamified password generation approach for stronger passwords
✅ Similarity analysis with the RockYou dataset to detect weak passwords
✅ Hashcat-based security simulations to predict time-to-crack values
✅ Graphical analysis and dashboards for clear insights

Key Concepts & Technologies
1. User Interaction & Chatbot Assistance
Users can input a password or generate one using a gamified approach.

The chatbot provides real-time feedback, highlighting weak passwords and suggesting improvements.

2. Vector Embeddings for Password Similarity Analysis
The RockYou dataset is simplified into vector embeddings.

User password embeddings are computed and compared against this dataset.

A similarity score is generated to measure password strength.

3. Cryptographic Hashing & Salting
Passwords are hashed before storage using secure cryptographic methods.

Salting & peppering techniques prevent brute-force attacks and rainbow table attacks.

4. Security Simulations with Hashcat
The system simulates real-world attacks using Hashcat to determine how long a password would take to crack.

Time-to-crack values help users understand their password strength.

5. Graphical Analysis & Admin Dashboard
A visual dashboard displays:

Password strength distribution

Common vulnerabilities

Clustered insights to improve security policies

Unique Selling Points (USP)
✅ Real-time password feedback with AI
✅ Gamified approach for stronger password creation
✅ Machine learning-based similarity detection
✅ Security simulations to estimate password strength
✅ Graphical analysis for better insights

## System Workflow
Below is a detailed workflow diagram showing the password creation and analysis process:

![Password Creation and Analysis Workflow](images/workflow-diagram.png)

The diagram illustrates the complete system workflow including:
- Password Selection and Processing
- Analysis and Feedback Generation
- Admin Analysis Features
- Password Creation Options (Conventional & Gamified approaches)