package util

func InterpolateAmount(low int, high int, progressPercentage int) int {
	return low + (high-low)*progressPercentage/100

}
