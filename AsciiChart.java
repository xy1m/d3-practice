package com.bsi.tools;

import org.apache.commons.lang.math.RandomUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by gzhang on 3/18/2016.
 */
public class AsciiChart {
    public final static char BLANK=' ';
    public final static char BLOCK='*';
    public final static int H=50;
    public final static int W=50;
    public final static float scale=1.0f;

    class Bar {
        String name;
        String info;
        int x;
        int y;
        int width;
        int height;

        public Bar(String name, String info, int x, int y, int width, int height) {
            this.name = name;
            this.info = info;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    public static void draw(List<Bar> list){
        char[][] matrix=new char[H][W];
        int n=matrix.length;
        int m=matrix[0].length;
        for(Bar b:list){
            for(int j=b.y;j<b.y+b.height;j++){
                for(int i=b.x;i<b.x+b.width;i++){
                    matrix[H-1-j][i]=BLOCK;
                }
            }
        }
        print(matrix);
    }

    public static void print(char[][] matrix){
        int n=matrix.length;
        int m=matrix[0].length;
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(matrix[i][j]=='\0'){
                    System.out.print(BLANK);
                }else{
                    System.out.print(matrix[i][j]);
                }
            }
            System.out.println();
        }
    }


    public static void main(String args[]) {
        List<Bar> data=new ArrayList<>();
        for(int i=0;i<25;i+=3){
            data.add(new AsciiChart().new Bar("1","1",i,0,1,RandomUtils.nextInt(30)));
        }
        draw(data);
    }
}
