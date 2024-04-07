package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	keepertest "aptcaller/testutil/keeper"
	"aptcaller/x/aptcaller/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := keepertest.AptcallerKeeper(t)
	params := types.DefaultParams()

	require.NoError(t, k.SetParams(ctx, params))
	require.EqualValues(t, params, k.GetParams(ctx))
}
