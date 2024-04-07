package types

const (
	// ModuleName defines the module name
	ModuleName = "aptcaller"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_aptcaller"
)

var (
	ParamsKey = []byte("p_aptcaller")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
