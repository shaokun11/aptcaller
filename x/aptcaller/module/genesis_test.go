package aptcaller_test

import (
	"testing"

	keepertest "aptcaller/testutil/keeper"
	"aptcaller/testutil/nullify"
	aptcaller "aptcaller/x/aptcaller/module"
	"aptcaller/x/aptcaller/types"

	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AptcallerKeeper(t)
	aptcaller.InitGenesis(ctx, k, genesisState)
	got := aptcaller.ExportGenesis(ctx, k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
