#include <iostream>
    #include <vector>
    using namespace std;
    int tribonacci(int n) {
        vector<int> table(40);
        if(n==0) return 0;
        else if(n==1) return 1;
        else if(n==2) return 1;
        else {
            table[0]=0;
            table[1]=1;
            table[2]=1;
            for(int i=3;i<=n;i++){
                table[i]=table[i-1]+table[i-2]+table[i-3];
            }
            return table[n];
        }
    }
    int main(){
        int a[1];
        cin>>a[0];
        cout<<tribonacci(a[0])<<endl;
        return 0;
    }



// #include <bits/stdc++.h>
// using namespace std;
// int kSimilarity(string A, string B) {
//         queue<string> q;
//         unordered_set<string> lookup;
//         lookup.emplace(A);
//         q.emplace(A);
//         int result = 0;
//         while (!q.empty()) {
//             for (int size = q.size() - 1; size >= 0; --size) {
//                 auto s = q.front(); q.pop();
//                 if (s == B) {
//                     return result;
//                 }
//                 int i;
//                 for (i = 0; s[i] == B[i]; ++i);
//                 for (int j = i + 1; j < s.length(); ++j){
//                     if (s[j] == B[j] || s[i] != B[j]) {
//                         continue;
//                     }
//                     swap(s[i], s[j]);
//                     if (!lookup.count(s)) {
//                         lookup.emplace(s);
//                         q.emplace(s);
//                     }
//                     swap(s[i], s[j]);
//                 }
//             }
//             ++result;
//         }
//         return result;
//     }
// int main() {
//     string a[2];
//     for(int i=0;i<2;i++) {
//         cin >> a[i];
//     }
//     cout << kSimilarity(a[0], a[1]) << endl;
//     return 0;
// }









    

















// #include <iostream>
// #include <unordered_map>
// #include <string>
// using namespace std;

// int firstUniqChar(string s) {
//     unordered_map<char, int> charCount;
//     for (char c : s) {
//         charCount[c]++;
//     }
//     for (int i = 0; i < s.size(); i++) {
//         if (charCount[s[i]] == 1) {
//             return i;
//         }
//     }
//     return -1; 
// }

// int main() {
//     string s[1];
//     cin >> s[0];

//     int index = firstUniqChar(s[0]);
//     if (index != -1) {
//         cout <<  index << endl;
//     } else {
//         cout << "-1"<< endl;
//     }

//     return 0;
// }
