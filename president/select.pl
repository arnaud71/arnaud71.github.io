use strict;
use Data::Dumper;

my $dir = shift @ARGV;

my @tab;
my $key = shift @ARGV;
for (my $i=0; $i<$dir-1; $i++) {
  my @tab1 = [0,0,0,0,0];
  push @tab,\@tab1;
}
my $i=0;
my $first_line;
for ($i=0; $i<scalar(@ARGV); $i++) {
  open(IN1,'./csv'.$dir.'/'.$ARGV[$i].'.csv') or die "open".'./'.$dir.'/'.$ARGV[$i].'_1'." in error\n";
  my @tab1;
  $first_line = <IN1>;
  my $j = 0;

  while(my $line1 = <IN1>) {
    chomp($line1);
    $line1 =~ s/,"/;"/g;
    $line1 =~ s/"//g;
    my @t = split /;/,$line1;
    $tab[$j][0] = $t[0];
    $tab[$j][1] += $t[1];
    $tab[$j][2] += $t[2];
    $tab[$j][3] += $t[3];
    $tab[$j][4] += $t[4];
    $tab[$j][5] += $t[5];
    $tab[$j][6] = $t[6];
    $tab[$j][7] = $t[7];
    $j++;
  }
  close(IN1);
}

my $t1 = 0;
my $t2 = 0;
my $t3 = 0;
my $t4 = 0;
my $t5 = 0;

open(OUT,'>./csv'.$dir.'/'.$key.'.csv')or die "open out error\n";
print OUT "date,hamon $key,macron $key,fillon $key,le pen $key,mélenchon $key,query,time\n";
my $l;
for ($l=0; $l<scalar(@tab); $l++) {
  #print Dumper($tab[$i]);
  my $col0 = $tab[$l][0];
  my $col1 = $tab[$l][1];
  my $col2 = $tab[$l][2];
  my $col3 = $tab[$l][3];
  my $col4 = $tab[$l][4];
  my $col5 = $tab[$l][5];
  my $col6 = $tab[$l][6];
  my $col7 = $tab[$l][7];

  $col1 /= $i;
  $col2 /= $i;
  $col3 /= $i;
  $col4 /= $i;
  $col5 /= $i;

  $t1 += $col1;
  $t2 += $col2;
  $t3 += $col3;
  $t4 += $col4;
  $t5 += $col5;

  #print join ';',@{$tab[$i]};
  print OUT '"'.$col0.'"'.','.'"'.$col1.'"'.','.'"'.$col2.'"'.','.'"'.$col3.'"'.','.'"'.$col4.'"'.','.'"'.$col5.'"'.','.'"'.$col6.'"'
  .','.'"'.$col7.'"';
  print OUT "\n";
}
close(OUT);
$t1 = sprintf("%.1f",$t1 /= $l);
$t2 = sprintf("%.1f",$t2 /= $l);
$t3 = sprintf("%.1f",$t3 /= $l);
$t4 = sprintf("%.1f",$t4 /= $l);
$t5 = sprintf("%.1f",$t5 /= $l);

open(OUT,'>./csv'.$dir.'/'.$key.'_total.csv')or die "open out error\n";
print OUT 'class,number'."\n";
print OUT "hamon $key".','.$t1."\n";
print OUT "macron $key".','.$t2."\n";
print OUT "fillon $key".','.$t3."\n";
print OUT "le pen $key".','.$t4."\n";
print OUT "mélenchon $key".','.$t5."\n";

close(OUT);
