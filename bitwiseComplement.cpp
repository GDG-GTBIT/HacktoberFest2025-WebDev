class Solution {
public:
    int bitwiseComplement(int n) {
        int mask = 0, nCopy = n;

        if (n == 0) return 1;

        while (nCopy != 0) {
            mask = mask | 1;
            nCopy = nCopy >> 1;
            
            if (nCopy == 0) {
                break;
            } else {
                mask = mask << 1;
            }
        }
        
        return ((~n) & mask);
    }
};
