#include <stdio.h>
int main() {
  int r00, r01, r02, r03, r10, r11, r12, r13, r20, r21, r22, r23, r30, r31, r32,
      r33;

  printf("Enter numbersfrom 1 to 16 in any order: ");
  scanf("%d%d%d%d%d%d%d%d%d%d%d%d%d%d%d%d", &r00, &r01, &r02, &r03, &r10, &r11,
        &r12, &r13, &r20, &r21, &r22, &r23, &r30, &r31, &r32, &r33);
  printf("%-3d%-3d%-3d%-3d\n", r00, r01, r02, r03);
  printf("%-3d%-3d%-3d%-3d\n", r10, r11, r12, r13);
  printf("%-3d%-3d%-3d%-3d\n", r20, r21, r22, r23);
  printf("%-3d%-3d%-3d%-3d\n", r30, r31, r32, r33);

  int r0_sum = r00 + r01 + r02 + r03;
  int r1_sum = r10 + r11 + r12 + r13;
  int r2_sum = r20 + r21 + r22 + r23;
  int r3_sum = r30 + r31 + r32 + r33;

  int c0_sum = r00 + r10 + r20 + r30;
  int c1_sum = r01 + r11 + r21 + r31;
  int c2_sum = r02 + r12 + r22 + r32;
  int c3_sum = r03 + r13 + r23 + r33;

  int diag_1 = r30 + r21 + r12 + r03;
  int diag_2 = r00 + r11 + r22 + r33;
  
  printf("Rows sum: %d %d %d %d\n", r0_sum, r1_sum, r2_sum, r3_sum);
  printf("Cols sum: %d %d %d %d\n", c0_sum, c1_sum, c2_sum, c3_sum);
  printf("Diagonal sum: %d %d\n", diag_1, diag_2);
  
}
