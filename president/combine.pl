use strict;
use Data::Dumper;

my $dir = $ARGV[0];

for (my $i=0; $i<100; $i++) {
  open(IN1,'./'.$dir.'/'.$i.'_1.csv') or die "open".'./csv/'.$i.'_1'." in error\n";
  my @tab1;
  my $first_line = <IN1>;
  while(my $line1 = <IN1>) {
    chomp($line1);
    my @t = split /;/,$line1;

    push @tab1,\@t;

  }
  close(IN1);

  open(IN2,'./'.$dir.'/'.$i.'_2.csv') or die "open".'./csv/'.$i.'_2'." in error\n";
  my @tab2;
  my $line2 = <IN2>;
  while(my $line2 = <IN2>) {
    chomp($line2);
    my @t = split /;/,$line2;
    push @tab2,\@t;
  }
  close(IN2);

  my $k = 0;
  open(OUT,'>./'.$dir.'/'.$i.'.csv')or die "open out error\n";
  print OUT $first_line;
  my $small = 8;
  my $t1 = 0;
  my $t2 = 0;
  my $t3 = 0;
  my $t4 = 0;
  my $t5 = 0;

  foreach (@tab1) {
    #print $tab1[$k][2]."\n";
    my $col1 = $tab1[$k][1];
    my $col2 = $tab1[$k][2];
    my $col3 = $tab1[$k][3];
    my $col4 = $tab1[$k][4]+$tab2[$k][4];
    my $col5 = $tab1[$k][5]+$tab2[$k][3];
    my $total = $col1 + $col2 + $col3 + $col4 + $col5;
    if ($total==0) {

    }
    else {
      $col1 = $col1/$total*(100-$small);
      $col2 = $col2/$total*(100-$small);
      $col3 = $col3/$total*(100-$small);
      $col4 = $col4/$total*(100-$small);
      $col5 = $col5/$total*(100-$small);
    }
    $t1 += $col1;
    $t2 += $col2;
    $t3 += $col3;
    $t4 += $col4;
    $t5 += $col5;
    print OUT '"'.$tab1[$k][0].'"'.','.'"'.$col1.'"'.','.'"'.$col2.'"'.','.'"'.$col3.'"'.','.'"'.$col4
    .'"'.','.'"'.$col5.'"'.','.'"'.$tab1[$k][6].'"'.','.'"'.$tab1[$k][7].'"';
    print OUT "\n";
    $k++;
  };

  close(OUT);
  $t1 /= $k;
  $t2 /= $k;
  $t3 /= $k;
  $t4 /= $k;
  $t5 /= $k;
  open(OUT,'>./'.$dir.'/'.$i.'_total.csv')or die "open out error\n";
  my @tab = split /,/,$first_line;
  print OUT 'class,number'."\n";
  print OUT $tab[1].','.$t1."\n";
  print OUT $tab[2].','.$t2."\n";
  print OUT $tab[3].','.$t3."\n";
  print OUT $tab[4].','.$t4."\n";
  print OUT $tab[5].','.$t5."\n";

  close(OUT);
}
