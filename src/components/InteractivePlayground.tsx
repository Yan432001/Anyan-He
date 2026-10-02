import React, { useState } from 'react';
import { Play, Check, Copy, Terminal, Server, ArrowRight, CornerDownLeft, Sparkles, Layers } from 'lucide-react';

interface NodeOption {
  id: string;
  name: string;
  type: string;
  status: 'Ready' | 'Active' | 'Connected';
  description: string;
  sampleCommand: string;
  sampleOutput: string;
}

const AVAILABLE_NODES: NodeOption[] = [
  {
    id: 'alchemy',
    name: 'Alchemy MCP Server',
    type: 'Web3 & RPC Gateway',
    status: 'Ready',
    description: 'Direct JSON-RPC bridge for querying smart contracts, transaction logs, and on-chain event streams.',
    sampleCommand: 'cora call alchemy:eth_getBalance --address "0x71C...49A" --chain ethereum',
    sampleOutput: `// Alchemy Node Dispatch Result
{
  "status": "success",
  "latencyMs": 14.2,
  "nodeId": "alchemy-mcp-sg-01",
  "result": {
    "balanceWei": "4218900000000000000",
    "balanceEth": "4.2189",
    "blockNumber": 21894012,
    "proofHash": "0x39a7...f14e"
  }
}`
  },
  {
    id: 'base',
    name: 'Base L2 Execution Node',
    type: 'State Relay',
    status: 'Connected',
    description: 'Optimistic rollup state synchronizer with sub-second finality confirmation.',
    sampleCommand: 'cora sync base:state_batch --batchId "0x981a"',
    sampleOutput: `// Base L2 Batch Verification
{
  "batchStatus": "finalized",
  "gasUsed": "142,500",
  "txCount": 64,
  "l1Anchor": "confirmed",
  "verificationProof": "cora:crdt:anchor:ok"
}`
  },
  {
    id: 'github',
    name: 'GitHub Enterprise MCP',
    type: 'Developer Platform',
    status: 'Active',
    description: 'Model Context Protocol server for inspecting pull requests, automating CI triage, and code review.',
    sampleCommand: 'cora run github:pr_triage --repo "org/core-protocol" --pr 412',
    sampleOutput: `// GitHub MCP Execution Trace
{
  "action": "pr_analyzed",
  "diffStats": { "files": 7, "additions": 312, "deletions": 48 },
  "securityChecks": "passed",
  "suggestedReviewers": ["@anyan-he", "@core-maintainer"],
  "ciRunId": "91240182"
}`
  },
  {
    id: 'redis',
    name: 'Redis Edge Cache Mesh',
    type: 'Distributed Cache',
    status: 'Ready',
    description: 'Active-active multi-region cache with automated CRDT conflict resolution.',
    sampleCommand: 'cora get redis:crdt_key "session:agent_901:memory"',
    sampleOutput: `// Redis CRDT Edge Cluster Sync
{
  "clusterReplicas": 18,
  "syncLagMs": 2.1,
  "vectorClock": { "us-east": 84, "eu-west": 84, "ap-se": 83 },
  "valueState": "converged"
}`
  },
  {
    id: 'playwright',
    name: 'Microsoft Playwright MCP',
    type: 'Autonomous Web Sandbox',
    status: 'Connected',
    description: 'Isolated headless browser runner for dynamic DOM extraction and authenticated flows.',
    sampleCommand: 'cora exec playwright:scrape --url "https://api.docs.internal" --tree "semantic"',
    sampleOutput: `// Playwright Sandbox Trace
{
  "sandboxId": "vm-isolated-209",
  "navigationTimeMs": 210,
  "accessibilityTreeNodes": 148,
  "screenshotHash": "sha256:d8a2...3e91",
  "status": "terminated_cleanly"
}`
  }
];

export const InteractivePlayground: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeOption>(AVAILABLE_NODES[0]);
  const [commandInput, setCommandInput] = useState<string>(AVAILABLE_NODES[0].sampleCommand);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string>(AVAILABLE_NODES[0].sampleOutput);
  const [copied, setCopied] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(1);

  const handleSelectNode = (node: NodeOption) => {
    setSelectedNode(node);
    setCommandInput(node.sampleCommand);
    setExecutionOutput(node.sampleOutput);
  };

  const handleRunCommand = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(selectedNode.sampleOutput);
      setStepIndex(3);
    }, 450);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(executionOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-24 border-t border-white/[0.06] bg-[#07070b] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              CHOOSE · DEPLOY · COMMAND · ITERATE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-display text-balance">
            How It Works & Playground Mode
          </h2>

          <p className="text-base text-zinc-400 leading-relaxed text-balance">
            Select from modular MCP nodes, configure execution parameters, and test real-time agent dispatch behaviors in an interactive sandbox.
          </p>
        </div>

        {/* 4-Step Bento Grid directly mirroring the reference design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Card 1: Choose Node */}
          <div 
            onClick={() => setStepIndex(0)}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              stepIndex === 0 
                ? 'bg-zinc-900/90 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.06)]' 
                : 'bg-zinc-950/70 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Step 01</div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Choose Node</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Select a compute node from the MCP marketplace or configure custom endpoints.
              </p>
            </div>

            {/* Glowing Emblem */}
            <div className="w-full py-8 flex items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Layers className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 text-center">
              Active: {selectedNode.name}
            </div>
          </div>

          {/* Card 2: Deploy to CORA */}
          <div 
            onClick={() => setStepIndex(1)}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              stepIndex === 1 
                ? 'bg-zinc-900/90 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.06)]' 
                : 'bg-zinc-950/70 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Step 02</div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Deploy to CORA</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Spin up your node on Onion AI's Q-Flow backend infrastructure.
              </p>
            </div>

            {/* Node Selector List (as in screenshot) */}
            <div className="flex flex-col gap-2 my-2">
              {AVAILABLE_NODES.map((node) => {
                const isCurrent = node.id === selectedNode.id;
                return (
                  <button
                    key={node.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode(node);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                      isCurrent
                        ? 'bg-white/10 text-white border border-white/20 font-medium'
                        : 'bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{node.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-zinc-400 text-center pt-2">
              Click node to activate
            </div>
          </div>

          {/* Card 3: Register + Publish */}
          <div 
            onClick={() => setStepIndex(2)}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              stepIndex === 2 
                ? 'bg-zinc-900/90 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.06)]' 
                : 'bg-zinc-950/70 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Step 03</div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Register + Publish</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Link credentials, enable voice logic, and publish for testing.
              </p>
            </div>

            {/* Isometric 3D wireframe box render */}
            <div className="py-4 flex items-center justify-center">
              <svg className="w-24 h-24 text-zinc-400/80 stroke-current" viewBox="0 0 100 100" fill="none">
                {/* Isometric Cube */}
                <polygon points="50,15 85,35 50,55 15,35" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
                <polygon points="15,35 50,55 50,90 15,70" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.01)" />
                <polygon points="50,55 85,35 85,70 50,90" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
                <circle cx="50" cy="55" r="4" fill="white" />
                <line x1="50" y1="55" x2="50" y2="15" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Simulated Command Input Field (from screenshot) */}
            <div className="relative mt-2">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunCommand()}
                placeholder="Give any command...!"
                className="w-full bg-zinc-900 border border-white/15 rounded-lg py-2 pl-3 pr-8 text-[11px] font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/40"
              />
              <button
                onClick={handleRunCommand}
                disabled={isExecuting}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                aria-label="Send command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Playground Mode */}
          <div 
            onClick={() => setStepIndex(3)}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              stepIndex === 3 
                ? 'bg-zinc-900/90 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.06)]' 
                : 'bg-zinc-950/70 border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Step 04</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyOutput();
                  }}
                  className="text-zinc-400 hover:text-white p-1"
                  title="Copy output"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Playground Mode</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Simulate, refine, and iterate agent behaviors in a safe environment.
              </p>
            </div>

            {/* Terminal Window as in the screenshot */}
            <div className="rounded-lg bg-black/90 border border-white/10 p-3 font-mono text-[10px] text-zinc-300 leading-relaxed overflow-x-auto max-h-36">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/10 text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                <span className="w-2 h-2 rounded-full bg-green-500/70" />
                <span className="ml-1 text-[9px] text-zinc-500">cora-terminal</span>
              </div>
              {isExecuting ? (
                <div className="flex items-center gap-2 py-4 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 animate-ping" />
                  <span>Dispatching to {selectedNode.name}...</span>
                </div>
              ) : (
                <pre className="text-zinc-300 whitespace-pre font-mono">{executionOutput}</pre>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRunCommand();
              }}
              disabled={isExecuting}
              className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isExecuting ? 'Dispatching...' : 'Execute Test Run'}</span>
            </button>
          </div>
        </div>

        {/* Live Code API Request Window (matching "What we provide?" from bottom of screenshot) */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/90 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                POST /v1/mcp/dispatch · Anyan He Architecture Specification
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Payload: <span className="text-zinc-200">24KB</span> · Transport: <span className="text-zinc-200">gRPC/QUIC</span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
            <div>
              <div className="text-zinc-500 mb-2">// 1. Client Dispatch Invocation</div>
              <pre className="text-zinc-300 leading-relaxed overflow-x-auto bg-black/60 p-4 rounded-xl border border-white/5">
{`// Dispatch execution via CORA Engine Runtime
const response = await coraClient.dispatch({
  targetNode: "${selectedNode.id}",
  command: "${commandInput}",
  auth: {
    signature: "ed25519:0x892a...c01f",
    sessionTtlMs: 3600000
  },
  timeoutMs: 4000
});

console.log("Latency:", response.latencyMs, "ms");`}
              </pre>
            </div>

            <div>
              <div className="text-zinc-500 mb-2">// 2. Verified Edge Response Body</div>
              <pre className="text-emerald-400/90 leading-relaxed overflow-x-auto bg-black/60 p-4 rounded-xl border border-white/5">
{executionOutput}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
