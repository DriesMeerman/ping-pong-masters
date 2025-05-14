import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Basic type definition for the placeholder, ideally import shared types
interface Player {
  id: string;
  name: string;
  seed?: number;
}

interface MatchSlot {
  type: 'player' | 'progression';
  playerId?: string;
  seed?: number;
  sourceMatchId?: string;
}

interface Match {
  id: string;
  slots: MatchSlot[];
  winnerId: string | null;
  score: string | null;
  nextMatchId: string | null;
}

interface Round {
  roundNumber: number;
  name: string;
  matches: Match[];
}

interface TournamentData {
  id: number | string;
  name: string;
  date: string;
  status: string;
  description: string;
  players: Player[];
  structure: string;
  rounds: Round[];
  tournamentWinnerId: string | null;
}

interface D3BracketProps {
  tournamentData: TournamentData | null;
  getPlayerName: (playerId: string | undefined) => string;
}

// Data structure for d3.stratify
interface StratifyNode {
  id: string; // Match ID
  parentId: string | null; // Next Match ID (null for the final match/root)
  matchData: Match; // Original match object
  // Add a name for easier debugging in D3, derived from player names or match ID
  displayName: string;
}

function transformDataForD3(
    tournamentData: TournamentData,
    getPlayerName: (playerId: string | undefined) => string
    ): StratifyNode[] {
  const d3Nodes: StratifyNode[] = [];

  tournamentData.rounds.forEach(round => {
    round.matches.forEach(match => {
      let nodeDisplayName = `Match ${match.id}`;
      if (match.slots.length === 2) {
        const p1Slot = match.slots[0];
        const p2Slot = match.slots[1];
        let p1Name = "TBD";
        let p2Name = "TBD";

        // Helper to get player name or progression string
        const slotToDisplayName = (slot: MatchSlot): string => {
            if (slot.type === 'player' && slot.playerId) {
                return getPlayerName(slot.playerId);
            } else if (slot.type === 'progression' && slot.sourceMatchId) {
                return `Winner of ${slot.sourceMatchId}`;
            }
            return "TBD";
        };
        p1Name = slotToDisplayName(p1Slot);
        p2Name = slotToDisplayName(p2Slot);
        nodeDisplayName = `${p1Name} vs ${p2Name}`;
      }


      d3Nodes.push({
        id: match.id,
        parentId: match.nextMatchId, // The match this one feeds into is its "parent"
        matchData: match,
        displayName: nodeDisplayName,
      });
    });
  });
  return d3Nodes;
}

const D3Bracket: React.FC<D3BracketProps> = ({ tournamentData, getPlayerName }) => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (tournamentData && getPlayerName && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove();

      const margin = { top: 20, right: 150, bottom: 20, left: 50 }; // Adjusted margins
      const containerWidth = (d3Container.current.parentElement?.clientWidth || 800) ;
      const width = Math.max(containerWidth, tournamentData.rounds.length * 200) - margin.left - margin.right;
      const height = Math.max(600, tournamentData.rounds.reduce((max, r) => Math.max(max, r.matches.length),0) * 100) - margin.top - margin.bottom; // Increased per-match height


      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);

      const g = svg.append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);

      const transformedNodes = transformDataForD3(tournamentData, getPlayerName);
      console.log("Transformed Nodes for D3 Stratify:", transformedNodes);

      if (transformedNodes.length === 0) {
        g.append("text").attr("x", width/2).attr("y", height/2).attr("text-anchor", "middle").text("No match data to display.");
        return;
      }

      const hasRootNode = transformedNodes.some(node => node.parentId === null);
      if (!hasRootNode && transformedNodes.length > 0) {
          const allMatchIdsWithParents = new Set(transformedNodes.map(n => n.parentId).filter(pId => pId !== null) as string[]);
          const potentialRoots = transformedNodes.filter(n => !allMatchIdsWithParents.has(n.id));

          if (potentialRoots.length === 1) {
              console.warn(`No explicit root (parentId: null) found. Assuming match ${potentialRoots[0].id} is the root as it's not a parentId for any other node.`);
              // Modify the presumed root to have parentId: null for stratify
              const rootIndex = transformedNodes.findIndex(n => n.id === potentialRoots[0].id);
              if (rootIndex !== -1) transformedNodes[rootIndex].parentId = null;
          } else if (potentialRoots.length === 0 && transformedNodes.length > 0) {
             console.error("D3 Stratify: No root node candidates found. Check data structure (nextMatchId links).");
             g.append("text").attr("x", width/2).attr("y", height/2).attr("text-anchor", "middle").text("Error: Could not determine bracket root.");
             return;
          } else if (potentialRoots.length > 1) {
             console.warn(`D3 Stratify: Multiple potential root nodes (${potentialRoots.map(r=>r.id).join(", ")}). Stratify might pick the first one with parentId null or error. Ensure only one ultimate final match.`);
          }
      }

      try {
        const root = d3.stratify<StratifyNode>()
          .id(d => d.id)
          .parentId(d => d.parentId)
          (transformedNodes);

        const treeLayout = d3.tree<StratifyNode>()
          .size([height, width]);

        treeLayout(root);

        const d3Nodes = root.descendants();
        const d3Links = root.links();

        console.log("D3 Hierarchy Nodes:", d3Nodes);
        console.log("D3 Hierarchy Links:", d3Links);

        // Draw links
        g.selectAll(".link")
          .data(d3Links)
          .join("path")
          .attr("class", "link")
          .attr("fill", "none")
          .attr("stroke", "var(--color-olive)") // Use CSS variable for color
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 1.5)
          .attr("d", d3.linkHorizontal<any, d3.HierarchyPointNode<StratifyNode>>()
            .x(d => d.y) // d.y is the depth (horizontal position)
            .y(d => d.x) // d.x is the breadth (vertical position)
          );

        // Draw nodes
        const nodeEnter = g.selectAll(".node")
          .data(d3Nodes)
          .join("g")
          .attr("class", "node")
          .attr("transform", d => `translate(${d.y},${d.x})`) // d.y for x-coord, d.x for y-coord
          .attr("cursor", "pointer");
          // .on("click", (event, d) => {
          //   console.log("Clicked node:", d.data);
          // });

        const nodeWidth = 120;
        const nodeHeight = 60;

        nodeEnter.append("rect")
          .attr("x", -nodeWidth / 2)
          .attr("y", -nodeHeight / 2)
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("fill", "var(--color-cream)") // Use CSS variable
          .attr("stroke", "var(--color-skin)") // Use CSS variable
          .attr("stroke-width", 1.5)
          .attr("rx", 5) // Rounded corners
          .attr("ry", 5);

        nodeEnter.append("text")
          .attr("dy", ".35em") // Vertically center
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .style("fill", "var(--color-text-olive)")
          .text(d => {
            const match = d.data.matchData;
            if (!match) return d.data.displayName; // Fallback

            const p1Slot = match.slots[0];
            const p2Slot = match.slots[1];
            let p1Name = "TBD";
            let p2Name = "TBD";

            const slotToDisplayName = (slot: MatchSlot): string => {
                if (slot.type === 'player' && slot.playerId) {
                    return getPlayerName(slot.playerId);
                } else if (slot.type === 'progression' && slot.sourceMatchId) {
                    return `Winner of ${slot.sourceMatchId}`;
                }
                return "TBD";
            };

            if (p1Slot) p1Name = slotToDisplayName(p1Slot);
            if (p2Slot) p2Name = slotToDisplayName(p2Slot);

            return `${p1Name} vs ${p2Name}`;
          });

        // Add score text if match is completed
        nodeEnter.filter(d => !!(d.data.matchData && d.data.matchData.score))
          .append("text")
          .attr("dy", "1.8em") // Position below the names
          .attr("text-anchor", "middle")
          .style("font-size", "9px")
          .style("fill", "var(--color-amber)")
          .text(d => `Score: ${d.data.matchData.score}`);

      } catch (e) {
        console.error("Error creating D3 hierarchy or layout:", e);
        g.append("text")
         .attr("x", width / 2)
         .attr("y", height / 2)
         .attr("text-anchor", "middle")
         .style("font-size", "14px")
         .style("fill", "red")
         .text("Error initializing D3 bracket. Check console.");
      }

    }
  }, [tournamentData, getPlayerName]);

  if (!tournamentData) {
    return (
      <div className="p-6 bg-olive/10 rounded-lg min-h-[400px] flex items-center justify-center">
        <p className="text-xl text-olive/70">Loading tournament data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-olive/5 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-skin mb-3 text-center">Visual Bracket (D3.js)</h3>
      <div className="w-full overflow-x-auto">
        <svg ref={d3Container} className="block mx-auto bg-cream/10 rounded shadow-md">
          {/* D3 will render here */}
        </svg>
      </div>
      <p className="text-xs text-olive/60 mt-2 text-center">
        Scroll horizontally if bracket is wider than the view. Data logged to console.
      </p>
    </div>
  );
};

export default D3Bracket;