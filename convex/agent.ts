import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateAgent = mutation({
    args: {
        name: v.string(),
        agentId: v.string(),
    },
    handler: async (ctx, args) => {
        const results = await ctx.db.insert("AgentTable", {
            name: args.name,
            agentId: args.agentId,
            published: false,
        })
        return results;
    }
})