class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result=new ArrayList<>();
        if (nums == null) {
            return result;
        }
        set(new ArrayList<>(), nums, 0,result);

        return result;
    }
    private void set(List<Integer> currentSubset, int[] nums, int start,List<List<Integer>>result) {
        result.add(new ArrayList<>(currentSubset));
        for (int i = start; i < nums.length; i++) {
            currentSubset.add(nums[i]);
            set(currentSubset, nums, i + 1,result);
            currentSubset.remove(currentSubset.size() - 1);
        }
    }
}
