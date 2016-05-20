public class Solution{
	/*There are two sorted arrays A and B of size m and n respectively. Find the median of the two sorted
	arrays. The overall run time complexity should be O(log(m + n)).*/
	public double findMedianSortedArrays(int[] A,int[] B){
		int m=A.length,n=b.length;
		int total=m+n;
		if(k>total) return -1.0;

		if(total&0x1==1){
			return find_kth(A,m,B,n,total/2+1);
		}
		return (find_kth(A,m,B,n,total/2)+find_kth(A,m,B,n,total/2+1))/2;
	}

	public int find_kth(int[] A,int m,int[] B,int n,int k){
		if(m>n) return find_kth(B,n,A,m,k);
		if(m==0) return B[k-1];
		if(k==1) return Math.min(A[0],B[0]);

		int ia=Math.min(k/2,m),ib=k-ia;
		if(A[ia-1]<B[ib-1]) return find_kth(A+ia,m-ia,B,n,k-ia);
		else if(A[ia-1]>B[ib-1]) return find_kth(A,m,B+ib,n-ib,k-ib);
		else return A[ia-1];
	}
}
