import com.web.mindtrackproject.entity.Reminder;
import com.web.mindtrackproject.service.factory.AnnotationFactory;

public interface ReminderFactory implements AnnotationFactory {

    @Override
    public Reminder createReminder(){
        return new Reminder;
    }
}