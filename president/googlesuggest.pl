use strict;
use Time::Piece;

print wget('macron%20');
print wget('fillon%20');
print wget('hamon%20');
print wget('melenchon%20');
print wget('le%20pen%20');
print wget('cheminade%20');
print wget('lasalle%20');
print wget('arthaud%20');
print wget('dupont%20aignan%20');
print wget('asselineau%20');
print wget('poutou%20');
print wget('macron%20programme%20');
print wget('fillon%20programme%20');
print wget('hamon%20programme%20');
print wget('melenchon%20programme%20');
print wget('le%20pen%20programme%20');
print wget('cheminade%20programme%20');
print wget('lasalle%20programme%20');
print wget('arthaud%20programme%20');
print wget('dupont%20aignan%20programme%20');
print wget('asselineau%20programme%20');
print wget('poutou%20programme%20');

sub wget {
  my $str = shift @_;
  my $rnd = int(rand(10))+1;
  sleep($rnd);
  return(currentDate().','.clean(`wget -qO- "http://clients1.google.com/complete/search?hl=fr&client=firefox&q=$str"`)."\n");
}


sub clean {
  my $str = shift @_;
  $str =~ s/"//g;
  $str =~ s/\[|\]//g;
  return $str;
}

sub currentDate {
  my $date = localtime->strftime('%Y-%m-%d %H:00:00');
  return $date;
}
