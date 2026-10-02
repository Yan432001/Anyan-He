import { Project, ExperienceItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Anyan He",
  title: "Principal Systems & AI Protocol Architect",
  tagline: "Building modular compute engines, agentic MCP protocols, and fault-tolerant distributed infrastructure.",
  email: "heanyan1@gmail.com",
  github: "https://github.com",
  location: "San Francisco, CA / Remote",
  availability: "Available for Architecture Advisory & High-Throughput Systems",
  bio: "Specializing in the intersection of autonomous AI agent runtimes (Model Context Protocol), high-throughput distributed state sync, and systems-level infrastructure. Designed high-concurrency protocols servicing 50M+ requests daily with sub-15ms p99 latencies.",
};

export const PROJECTS: Project[] = [
  {
    id: "cora-engine",
    title: "CORA Engine & Onion MCP",
    subtitle: "Voice-Native Modular Compute Protocol & Agent Runtime",
    category: "mcp",
    featured: true,
    bentoSpan: "large",
    status: "Protocol Live",
    summary: "A voice-native modular compute protocol (MCP) bridging real-world tool execution (GitHub, Google Maps, Cloud Shell) with cryptographic on-chain verification.",
    description: "CORA Engine is a high-performance orchestration kernel built to bridge real-time voice streaming with deterministic tool calls through the Model Context Protocol (MCP). It features isolated sandboxing, asynchronous task pipelines, and stateful memory synchronization across edge clusters.",
    architectureSummary: "Three-tier architecture with a low-latency WebRTC/WebSocket audio pipeline, an agent dispatcher running in WebAssembly/Rust sandboxes, and a cryptographic verification engine anchoring action proofs.",
    metrics: [
      { label: "p99 Execution", value: "18.4ms", detail: "End-to-end dispatch" },
      { label: "Daily Node Operations", value: "14.2M+", detail: "Across edge nodes" },
      { label: "Voice-to-Tool Latency", value: "<180ms", detail: "Streaming acoustic parser" }
    ],
    technologies: ["Rust", "TypeScript", "Model Context Protocol", "WebRTC", "Docker", "WebAssembly"],
    githubUrl: "https://github.com",
    liveDemoUrl: "https://onion-ai.demo.internal",
    nodePillars: [
      "Decentralized MCP Marketplace",
      "Real-Time, Voice-Driven Execution",
      "Protocol Layer for Chain & App Interoperability"
    ],
    codeSnippet: {
      language: "typescript",
      filename: "cora_dispatcher.ts",
      code: `// Initialize CORA Voice-to-MCP Runtime Engine
import { CoraKernel, MCPNodeRegistry } from '@cora/protocol';

export const engine = new CoraKernel({
  voicePipeline: { sampleRate: 24000, streamingVAD: true },
  runtime: { isolateMode: 'wasm-sandboxed', timeoutMs: 3500 },
  stateSync: { edgeReplication: true, crdtMerge: 'lww-register' }
});

await engine.registerNode('alchemy-mcp-server', {
  endpoint: 'wss://node.alchemy.cora.network',
  capabilities: ['chain_read', 'receipt_verify', 'simulate_tx']
});`
    }
  },
  {
    id: "edge-sync",
    title: "EdgeSync Distributed Cache",
    subtitle: "Sub-Millisecond Active-Active Edge Replication Mesh",
    category: "systems",
    featured: true,
    bentoSpan: "medium",
    status: "Production",
    summary: "Ultra-low latency active-active cache synchronization across 18 geo-distributed edge clusters with automated Conflict-Free Replicated Data Types (CRDTs).",
    description: "Built to eliminate read-after-write inconsistencies across global Kubernetes clusters. Implements custom delta-state CRDTs over QUIC and WebSocket transport, delivering reliable state convergence even during partial cross-region network partitions.",
    architectureSummary: "Decentralized gossip mesh with vector clocks and hybrid logical time (HLC) ensuring causal consistency without single-leader bottlenecks.",
    metrics: [
      { label: "Cross-Region Sync", value: "8.6ms", detail: "Global median" },
      { label: "Cluster Throughput", value: "480k rps", detail: "Peak sustained load" },
      { label: "Partition Recovery", value: "100%", detail: "Zero data corruption" }
    ],
    technologies: ["Go", "Redis", "QUIC Protocol", "CRDTs", "eBPF", "Kubernetes"],
    githubUrl: "https://github.com",
    liveDemoUrl: "https://edgesync.cloud",
    codeSnippet: {
      language: "go",
      filename: "cluster_node.go",
      code: `// Multi-Region Active-Active CRDT Convergence Loop
func (n *EdgeNode) ReconcileState(ctx context.Context, delta *StateDelta) error {
    if !n.vectorClock.DescendsFrom(delta.Clock) {
        merged := n.crdtStore.MergeDelta(delta)
        return n.broadcastPeerGossip(ctx, merged)
    }
    return nil
}`
    }
  },
  {
    id: "playwright-agent-runtime",
    title: "Playwright Headless Agent Runtime",
    subtitle: "Deterministic Browser Automation Sandbox for Agentic Workflows",
    category: "mcp",
    featured: true,
    bentoSpan: "medium",
    status: "Enterprise Active",
    summary: "Containerized, security-hardened headless browser execution environment enabling autonomous LLM agents to safely interact with DOM, forms, and web apps.",
    description: "Designed for high-reliability web tasks: extracting dynamic structured telemetry, executing multi-step authenticated workflows, and capturing verifiable audit trails of agent decisions.",
    architectureSummary: "Ephemeral microVM containers with memory isolation, proxy rotation, cryptographic screen recording, and automated DOM accessibility-tree abstraction.",
    metrics: [
      { label: "Cold Start Time", value: "320ms", detail: "Container provision" },
      { label: "DOM Extraction", value: "<45ms", detail: "Accessible tree parsing" },
      { label: "Safe Execution Rate", value: "99.98%", detail: "Isolated memory" }
    ],
    technologies: ["TypeScript", "Playwright", "Docker", "Node.js", "gRPC", "Puppeteer Core"],
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "typescript",
      filename: "agent_runner.ts",
      code: `// Secure Agent Container Orchestration
const session = await sandboxPool.lease({
  headless: true,
  strictPermissions: ['dom_interact', 'screenshot_audit'],
  networkPolicy: 'allowlist_only'
});

const result = await session.executeTask(async (page) => {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  return await page.extractSemanticTree();
});`
    }
  },
  {
    id: "plugstack-cli",
    title: "PlugStack Dev Tools & Schema Engine",
    subtitle: "High-Performance Rust CLI & MCP Server Generator",
    category: "infra",
    featured: false,
    bentoSpan: "tall",
    status: "Open Source",
    summary: "CLI toolchain and code synthesis engine for lightning-fast Model Context Protocol server scaffolding, schema linting, and automated test mocks.",
    description: "Accelerates protocol adoption by generating type-safe client wrappers and server skeletons in TypeScript, Rust, and Python directly from OpenAPI, GraphQL, or JSON-RPC schema definitions.",
    architectureSummary: "Rust binary compilation with Zero-Copy AST parser and built-in interactive REPL for inspecting tool call payloads and mocking upstream services.",
    metrics: [
      { label: "Schema Parse Time", value: "2.1ms", detail: "For 500+ endpoints" },
      { label: "CLI Binary Size", value: "8.4MB", detail: "Zero external dependencies" },
      { label: "Weekly Downloads", value: "28k+", detail: "crates.io & npm" }
    ],
    technologies: ["Rust", "Tokio", "Clap", "WebAssembly", "TypeScript", "JSON Schema"],
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "rust",
      filename: "main.rs",
      code: `// PlugStack CLI Schema Synthesizer
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();
    let schema = Parser::load_manifest(&args.spec_path)?;
    let generator = CodeGen::new(TargetLanguage::TypeScript);
    generator.emit_mcp_bindings(&schema, &args.output_dir)?;
    Ok(())
}`
    }
  },
  {
    id: "solana-stream-relay",
    title: "ChainAware StreamRelay Protocol",
    subtitle: "High-Frequency On-Chain Event Ingestion & Webhook Pipeline",
    category: "protocols",
    featured: false,
    status: "Protocol Live",
    summary: "Fault-tolerant block ingestion engine translating raw validator gossip into low-latency gRPC streams for off-chain microservices and financial settlement.",
    description: "Processes gigabytes of transaction state per minute, offering sub-second transaction indexing and programmable webhook triggers with deduplication guarantees.",
    architectureSummary: "High-performance consumer groups connected directly to Geyser validator plugins with RocksDB local checkpointing and Apache Kafka backpressure management.",
    metrics: [
      { label: "Ingestion Latency", value: "95ms", detail: "From block confirmation" },
      { label: "Throughput", value: "65k tps", detail: "Peak stress tests" },
      { label: "Uptime Reliability", value: "99.995%", detail: "Multi-cluster HA" }
    ],
    technologies: ["Rust", "Solana Geyser", "Kafka", "gRPC", "RocksDB", "PostgreSQL"],
    githubUrl: "https://github.com"
  },
  {
    id: "quant-telemetry",
    title: "Zero-Alloc eBPF Telemetry Mesh",
    subtitle: "Kernel-Level Observability for High-Throughput Kubernetes Clusters",
    category: "systems",
    featured: false,
    status: "Production",
    summary: "Non-invasive kernel probes measuring socket latencies, TCP retransmissions, and microservice RPC timings with sub-1% CPU overhead.",
    description: "Replaces traditional sidecar proxies with native eBPF programs loaded into the Linux kernel, capturing granular network flow diagrams and anomaly metrics in real time.",
    architectureSummary: "C-based eBPF bytecode verified by Linux kernel verifier, ring-buffered to a user-space Go daemon feeding Prometheus and OpenTelemetry collectors.",
    metrics: [
      { label: "CPU Overhead", value: "<0.4%", detail: "At 10Gbps line rate" },
      { label: "Packet Drop Rate", value: "0.00%", detail: "Ring-buffer architecture" },
      { label: "Metrics Granularity", value: "1μs", detail: "Kernel timestamping" }
    ],
    technologies: ["C", "Linux eBPF", "Go", "Prometheus", "OpenTelemetry", "Grafana"],
    githubUrl: "https://github.com"
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Principal Systems & AI Architect",
    company: "Distributed Protocols Lab",
    location: "San Francisco, CA",
    summary: "Leading technical architecture for next-generation modular compute protocols, real-time agentic execution engines, and cross-chain interoperability layers.",
    achievements: [
      "Architected CORA voice-native runtime, reducing multimodal speech-to-tool dispatch latency from 850ms to 180ms.",
      "Engineered active-active geo-distributed CRDT cache processing 480k requests/second across 18 edge clusters.",
      "Designed and open-sourced PlugStack developer toolchain adopted by 28,000+ developers globally."
    ],
    technologies: ["Rust", "TypeScript", "Model Context Protocol", "Go", "Docker", "Kubernetes", "QUIC"]
  },
  {
    period: "2021 — 2023",
    role: "Staff Infrastructure & Distributed Systems Engineer",
    company: "Nexus Cloud Infrastructure",
    location: "Palo Alto, CA",
    summary: "Led core infrastructure initiatives focusing on high-throughput microservices, telemetry fabric, and resilient state storage.",
    achievements: [
      "Deployed zero-allocation eBPF network telemetry across 1,200+ Kubernetes nodes, eliminating 15% CPU sidecar tax.",
      "Spearheaded database scaling program that transitioned multi-region services to low-latency edge caches with zero unplanned downtime.",
      "Mentored a team of 11 engineers across systems programming, concurrency debugging, and production incident response."
    ],
    technologies: ["Go", "C/eBPF", "Redis", "PostgreSQL", "Kafka", "Terraform", "AWS / GCP"]
  },
  {
    period: "2019 — 2021",
    role: "Senior Full-Stack & Systems Engineer",
    company: "Krypton Platform Technologies",
    location: "Remote",
    summary: "Engineered high-frequency indexing pipelines, developer tooling SDKs, and cryptographic verification backends.",
    achievements: [
      "Built real-time transaction ingestion engine parsing 65,000+ operations/second with sub-100ms latency.",
      "Architected developer SDKs that reduced enterprise customer onboarding time from 3 weeks to 2 hours."
    ],
    technologies: ["TypeScript", "Rust", "Node.js", "React", "GraphQL", "WebSockets"]
  }
];

export const TECH_PILLARS = [
  {
    title: "Modular Compute & MCP",
    description: "Standardized protocols connecting AI models with sandboxed tools, stateful memory, and deterministic execution.",
    techs: ["Model Context Protocol (MCP)", "Rust Runtime", "Wasm Sandboxes", "Async Agent Queues", "Streaming WebSockets"]
  },
  {
    title: "High-Throughput Distributed Systems",
    description: "Active-active consistency, state synchronization, partition resilience, and kernel-level network telemetry.",
    techs: ["CRDTs & Vector Clocks", "eBPF Kernel Probes", "Redis Cluster", "QUIC Protocol", "Go Microservices"]
  },
  {
    title: "Full-Stack & Developer Experience",
    description: "High-craft user interfaces, responsive visual telemetry, clean REST/gRPC endpoints, and ergonomic CLI tools.",
    techs: ["React 19 / TypeScript", "Tailwind CSS", "Tokio / Clap (Rust)", "Node.js / Express", "Docker Containers"]
  }
];

export const INTEGRATIONS_LIST = [
  { name: "Google Cloud", category: "Infra" },
  { name: "Rust", category: "Systems" },
  { name: "TypeScript", category: "Language" },
  { name: "Model Context Protocol", category: "AI" },
  { name: "Redis", category: "Cache" },
  { name: "Docker", category: "Containers" },
  { name: "Alchemy", category: "Web3" },
  { name: "GitHub", category: "Ecosystem" },
  { name: "Go", category: "Backend" },
  { name: "Kubernetes", category: "Orchestration" }
];
